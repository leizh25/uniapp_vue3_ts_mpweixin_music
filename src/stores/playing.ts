// stores/counter.js
import { defineStore } from 'pinia'
import processLrc from '@/utils/processLrc'
import { useSystemInfoStore } from '@/stores/systemInfo'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import { reqLrc, reqSongDetail, reqSongUrl } from '@/api/playing'
import type { LrcResponse, SongDetailResponse, SongUrlResponse } from '@/api/playing/type'
import type { PlayingStore } from './type'
import type { song } from '@/api/index/type'
export const usePlayingStore = defineStore('playing', {
  state: (): PlayingStore => {
    return {
      playingId: 0,
      paramPlayingId: '',
      playingIndex: 0,
      playingMode: 'order',
      playingSongInfo: {},
      playingSongIdList: [],
      playingSongList: [],
      prevSongList: [],
      playingSongUrl: '',
      isPlaying: false,
      bgAudioManager: uni.getBackgroundAudioManager(),
      currentTime: 0, //当前播放时间
      validDuration: 0, //真实获取到可播放的时长
      validProgress: 0, //真实获取到可播放的进度
      isShowLyricsTip: true, //是否显示左划歌词提示
      processedLrc: {
        songId: 0,
        lrcText: {},
      }, //歌词
      lrcScrollTop: 0, //歌词滚动条滚动的距离
      lrcScrolledCount: 0, //已播放过的歌词的数量
      progressPercent: 0, //播放进度百分比
      isShowSongListSheet: false, //是否展示歌单列表
    }
  },
  actions: {
    // 上一曲
    async playPrevSong() {
      // 获取播放列表上一首
      if (this.playingMode === 'order') {
        // 顺序播放
        if (this.playingIndex == 0) {
          this.playingIndex = this.playingSongIdList.length - 1
        } else {
          this.playingIndex--
        }
        this.paramPlayingId = this.playingSongIdList[this.playingIndex]
      } else if (this.playingMode === 'random') {
        // 随机播放
        this.paramPlayingId = parseInt((Math.random() * this.playingSongIdList.length).toString()).toString()
      } else if (this.playingMode === 'circle') {
        // 单曲循环
        this.paramPlayingId = this.playingSongIdList[this.playingIndex]
      }
      try {
        await this.getSongUrl(this.paramPlayingId)
      } catch (error) {
        Notify({ type: 'danger', message: 'url获取失败,快联系我改bug', safeAreaInsetTop: true })
        return
      }
      try {
        await this.getDetail(this.playingSongIdList)
        await this.play()
      } catch (error) {
        Notify({ type: 'danger', message: '信息获取失败,快联系我改bug', safeAreaInsetTop: true })
        return
      }
      try {
        this.playingIndex = this.playingSongIdList.findIndex((item) => item == this.paramPlayingId)
        this.playingSongInfo = this.playingSongList[this.playingIndex]
        await this.getLrc(this.paramPlayingId)
      } catch (error) {}
    },

    // 下一曲
    async playNextSong(id?: string) {
      //如果传了音乐参数,则把他插入列表,然后执行播放下一首
      if (id !== undefined) {
        this.paramPlayingId = id.toString()
      } else {
        if (this.playingSongIdList.length == 1) {
          Notify({ type: 'warning', message: '播放列表只有一首歌', safeAreaInsetTop: true })
          this.lrcScrollTop = 0
          this.lrcScrolledCount = 0
        }
        if (this.playingMode === 'order') {
          // 顺序播放
          if (this.playingIndex == this.playingSongIdList.length - 1) {
            this.playingIndex = 0
          } else {
            this.playingIndex++
          }
          this.paramPlayingId = this.playingSongIdList[this.playingIndex]
        } else if (this.playingMode === 'random') {
          // 随机播放
          this.paramPlayingId = parseInt((Math.random() * this.playingSongIdList.length).toString()).toString()
        } else if (this.playingMode === 'circle') {
          // 单曲循环
          this.paramPlayingId = this.playingSongIdList[this.playingIndex]
        }
      }
      if (!this.playingSongIdList.includes(this.paramPlayingId)) {
        this.playingSongIdList.push(this.paramPlayingId)
      }
      // console.log('this.playingSongIdList: ', this.playingSongIdList)
      this.playingIndex = this.playingSongIdList.findIndex((item) => item == this.paramPlayingId)
      await this.getDetail(this.playingSongIdList)
      this.playingSongInfo = this.playingSongList[this.playingIndex]
      await this.getSongUrl(this.paramPlayingId)
      await this.play()
      await this.getLrc(this.paramPlayingId)
      //如果没有传参,则直接播放当前索引的下一首歌曲
      //判断播放模式
    },

    //获取歌曲详情
    async getDetail(ids: string | string[]) {
      // 如果要获取的音乐信息ID和当前已有的信息ID一致,则不获取
      // if (this.playingId != this.playingSongInfo.id) {
      //   const playingSongInfo: song = uni.getStorageSync('playingSongInfo')
      //   if (!playingSongInfo) return Promise.reject('未找到singing中的resoueceId')
      //   this.playingSongInfo = playingSongInfo
      // } else {
      //   const res: SongDetailResponse = await reqSongDetail(this.playingId.toString())
      //   if (res.code === 200) {
      //     this.playingSongInfo = res.songs[0]
      //     uni.setStorageSync('playingSongInfo', res.songs[0])
      //     return true
      //   } else return Promise.reject(res)
      // }
      try {
        let idstr: string | undefined
        if (typeof ids == 'string') {
          idstr = ids
          // if (this.playingId == ids || this.playingSongInfo.id?.toString() == ids) return
        } else if (typeof ids == 'object') {
          idstr = ids.join(',')
        }
        const res: SongDetailResponse = await reqSongDetail(idstr as string)
        if (res.code == 200) {
          this.playingSongList = res.songs as song[]
          return true
        } else {
          throw new Error(res.code?.toString() + ': 播放列表详情失败')
        }
      } catch (error: any) {
        Notify({ type: 'danger', message: error?.message })
        return new Error(error.message)
      }
    },
    //获取音乐播放地址
    async getSongUrl(id: string) {
      try {
        const res: SongUrlResponse = await reqSongUrl(+id, 'standard')
        if (res.code === 200) {
          this.playingSongUrl = res.data[0].url
          this.playingId = id

          return true
        } else {
          throw new Error(`${res}`)
        }
      } catch (error: any) {
        Notify({ type: 'danger', message: error?.message })
        return new Error(error.message)
      }
    },
    async init() {
      this.bgAudioManager.onPlay(() => {
        this.isPlaying = true
        console.log('开始播放')
      })
      this.bgAudioManager.onPause(() => {
        this.isPlaying = false
      })
      this.bgAudioManager.onCanplay(() => {
        if (this.isPlaying) {
          this.play()
        }
      })
      this.bgAudioManager.onTimeUpdate(() => {
        // 更新播放时间
        this.currentTime = this.bgAudioManager.currentTime
        // 获取真实可播放时长
        if (this.validDuration != this.bgAudioManager.duration) {
          this.validDuration = this.bgAudioManager.duration
          console.log('this.validDuration: ', this.validDuration)
        }
        // 滚动歌词
        let index = 0
        for (const key in this.processedLrc.lrcText) {
          // 如果当前时间大于等于(对象的键)歌词时间
          if (this.currentTime * 1000 >= +key) {
            // console.log('this.currentTime: ', this.currentTime)
            // 如果已播放过的歌词数量小于(对象的键)歌词索引,说明当前正在播放这句歌词
            if (this.lrcScrolledCount < index + 1) {
              this.lrcScrolledCount = index //更新已播放的歌词数量
              this.lrcScrollTop = this.lrcScrolledCount * 40 //40为歌词的行高
              // console.log('更新歌词滚动高度: this.lrcScrollTop: ', this.lrcScrollTop)
            }
          }
          index++
        }
        // 计算播放进度百分比
        this.progressPercent = parseInt((((this.currentTime * 1000) / this.playingSongInfo.dt!) * 100).toString())
      })
      this.bgAudioManager.onError(() => {
        console.log('播放出错')
      })
      this.bgAudioManager.onWaiting(() => {
        console.log('音频加载缓慢')
        Notify({ type: 'warning', message: '网络不佳,音频加载缓慢', top: useSystemInfoStore().statusBarHeight })
      })
      this.bgAudioManager.onEnded(() => {
        this.playNextSong()
      })
    },
    async play() {
      if (this.playingSongIdList.length === 0) {
        return Notify({ type: 'primary', message: '播放列表暂无歌曲', safeAreaInsetTop: true })
      }
      try {
        if (this.bgAudioManager.id !== this.playingId) {
          this.bgAudioManager.id = this.playingId
          this.bgAudioManager.title = this.playingSongInfo.name
          this.bgAudioManager.singer = this.playingSongInfo.ar?.map((item) => item.name).join('、') || '获取失败'
          this.bgAudioManager.coverImgUrl = this.playingSongInfo.al?.picUrl || '获取失败'
          this.bgAudioManager.src = this.playingSongUrl
          this.lrcScrollTop = 0
          this.lrcScrolledCount = 0
          this.progressPercent = 0
          console.log('this.playingSongUrl: ', this.playingSongUrl)
        }
        this.bgAudioManager.play()
        this.isPlaying = true
        return true
      } catch (error) {
        console.log('播放失败: ', error)
        Notify({ type: 'danger', message: '播放失败' })
        return
      }
    },
    pause() {
      this.bgAudioManager.pause()
      this.isPlaying = false
    },
    async getLrc(id: string) {
      // if (this.songInfo.id == this.singing.resourceId && Object.keys(this.songInfo).length === 0) return
      const res: LrcResponse = await reqLrc(+id)
      if (res.code === 200) {
        let Lrc = new processLrc(res.lrc.lyric)
        await Lrc.getLrc()
        this.processedLrc.lrcText = Lrc.timeTags
        // console.log('this.processedLrc: ', this.processedLrc)
        this.processedLrc.songId = +id
        return true
      } else {
        console.log('失败:获取歌词失败')
        Notify({ type: 'danger', message: '获取歌词失败,请重新进入播放页', top: useSystemInfoStore().statusBarHeight })
      }
    },
  },
})

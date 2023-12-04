// stores/counter.js
import { defineStore } from 'pinia'
import { request } from '@/utils/request'
import processLrc from '@/utils/processLrc'
import { useSystemInfoStore } from '@/stores/systemInfo.js'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify.js'

export const usePlayingStore = defineStore('playing', {
  state: () => {
    return {
      singingid: 0,
      singing: {},
      songInfo: {},
      songList: {},
      prevSongList: {},
      isPlaying: false,
      bgAudioManager: uni.getBackgroundAudioManager(),
      currentTime: 0, //当前播放时间
      validDuration: 0, //真实获取到可播放的时长
      validProgress: 0, //真实获取到可播放的进度
      isShowLyricsTip: true, //是否显示左划歌词提示
      processedLrc: {}, //歌词
      lrcScrollTop: 0, //歌词滚动条滚动的距离
      lrcScrolledCount: 0, //已播放过的歌词的数量
      progressPercent: 0, //播放进度百分比
      isShowSongListSheet: false, //是否展示歌单列表
    }
  },
  actions: {
    //获取歌曲详情
    async getDetail() {
      if (!this.singing.resourceId) {
        const songInfo = uni.getStorageSync('songInfo')
        if (!songInfo) return Promise.reject('未找到singing中的resoueceId')
        this.songInfo = songInfo
      } else {
        const res = await request({
          url: '/song/detail',
          data: {
            ids: this.singing.resourceId,
          },
        })
        if (res.code === 200) {
          const song = res.songs[0]
          const songInfo = {
            id: song.id,
            name: song.name,
            ar: song.ar,
            alia: song.alia,
            pop: song.pop,
            fee: song.fee,
            al: song.al,
            dt: song.dt,
            mark: song.mark,
            publishTime: song.publishTime,
          }
          this.songInfo = songInfo
          uni.setStorageSync('songInfo', songInfo)
          return true
        } else return Promise.reject(res)
      }
    },
    //获取音乐播放地址
    async getSongUrl() {
      const res = await request({
        url: '/song/url/v1',
        data: {
          id: this.songInfo.id,
          level: 'standard',
        },
      })
      if (res.code === 200) {
        this.url = res.data[0].url
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
        for (const key in this.processedLrc) {
          // 如果当前时间大于等于(对象的键)歌词时间
          if (this.currentTime * 1000 >= key) {
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
        this.progressPercent = parseInt(((this.currentTime * 1000) / this.songInfo.dt) * 100)
      })
      this.bgAudioManager.onError(() => {
        console.log('播放出错')
      })
      this.bgAudioManager.onWaiting(() => {
        console.log('音频加载缓慢')
        Notify({ type: 'warning', message: '网络不佳,音频加载缓慢', top: useSystemInfoStore().statusBarHeight })
      })
    },
    play() {
      if (this.bgAudioManager.title != this.singing.songName) {
        this.bgAudioManager.title = this.singing.songName || '获取失败'
        this.bgAudioManager.singer = this.singing.songAr.map((item) => item.name).join('、') || '获取失败'
        this.bgAudioManager.coverImgUrl = this.singing.imageUrl || '获取失败'
        this.bgAudioManager.src = this.url
        this.lrcScrollTop = 0
        this.lrcScrolledCount = 0
        this.progressPercent = 0
        console.log('this.url: ', this.url)
      }
      this.bgAudioManager.play()
      this.isPlaying = true
    },
    pause() {
      this.bgAudioManager.pause()
      this.isPlaying = false
    },
    async getLrc() {
      // if (this.songInfo.id == this.singing.resourceId && Object.keys(this.songInfo).length === 0) return
      const res = await request({
        url: '/lyric',
        data: {
          id: this.songInfo.id,
        },
      })
      if (res.code === 200) {
        let Lrc = new processLrc(res.lrc.lyric)
        await Lrc.getLrc()
        this.processedLrc = Lrc.timeTags
        console.log('this.processedLrc: ', this.processedLrc)
      } else {
        console.log('失败:获取歌词失败')
        Notify({ type: 'danger', message: '获取歌词失败,请重新进入播放页', top: useSystemInfoStore().statusBarHeight })
      }
    },
  },
})

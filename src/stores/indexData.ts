import { defineStore } from 'pinia'
import { reqHomepage } from '@/api/index'
import type { HomepageResponse, HOMEPAGE_BANNER, IndexData } from '@/api/index/type'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
export const useIndexDataStore = defineStore('indexData', {
  state: (): IndexData => {
    return {
      // 1 轮播图
      HOMEPAGE_BANNER: {},
      // 2 龙舟
      HOMEPAGE_BLOCK_OLD_DRAGON_BALL: {},
      // 3 推荐歌单
      HOMEPAGE_BLOCK_PLAYLIST_RCMD: {},
      // 4 系统推荐
      HOMEPAGE_BLOCK_STYLE_RCMD: {},
      // 5 新歌新碟 \ 数字专辑
      HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: {},
      // 6 热门话题
      HOMEPAGE_BLOCK_HOT_TOPIC: {},
      // 7 音乐日历
      HOMEPAGE_MUSIC_CALENDAR: {},
      // 8 精选音乐视频
      HOMEPAGE_MUSIC_MLOG: {},
      // 9 雷达歌单
      HOMEPAGE_BLOCK_MGC_PLAYLIST: {},
      // 10 专属场景歌单
      HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: {},
      // 11 热门播客
      HOMEPAGE_VOICELIST_RCMD: {},
      // 12 广播
      HOMEPAGE_PODCAST24: {},
      // 13 云村出品
      HOMEPAGE_BLOCK_YUNCUN_PRODUCED: {},
      // 14 视频合辑
      HOMEPAGE_BLOCK_VIDEO_PLAYLIST: {},
      // 15 热评歌曲
      HOMEPAGE_BLOCK_NEW_HOT_COMMENT: {},
      // 16 精品有声书
      HOMEPAGE_VOICEBOOK_RCMD: {},
      // 推荐歌单中的上下轮播
      HOMEPAGE_BLOCK_PLAYLIST_RCMD_SCROLL_LIST: {},
      // 推荐歌单中的左右滑动
      HOMEPAGE_BLOCK_PLAYLIST_RCMD_LIST: [],
    }
  },
  actions: {
    async init() {
      let result: HomepageResponse
      let blocks = []
      //请求
      try {
        result = await reqHomepage()
        // console.log('result: ', result)
        if (result.code !== 200) {
          Notify({ type: 'danger', message: '首页数据加载失败,请重试' })
          return Promise.reject(result.message || '首页数据请求失败')
        }
        blocks = result.data.blocks
      } catch (error) {
        console.log(error)
        return
      }
      //处理数据
      blocks.forEach((block) => {
        //   1. 轮播图
        try {
          if (block.blockCode === 'HOMEPAGE_BANNER' && block.showType === 'BANNER') {
            this.HOMEPAGE_BANNER = block
          }
        } catch (error) {}
        //   2.龙舟
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_OLD_DRAGON_BALL' && block.showType === 'DRAGON_BALL') {
            this.HOMEPAGE_BLOCK_OLD_DRAGON_BALL = block
          }
        } catch (error) {}
        //   3. 推荐歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            this.HOMEPAGE_BLOCK_PLAYLIST_RCMD = block
            this.HOMEPAGE_BLOCK_PLAYLIST_RCMD_SCROLL_LIST = block.creatives![0]
            this.HOMEPAGE_BLOCK_PLAYLIST_RCMD_LIST = block.creatives!.slice(1,5)
          }
        } catch (error) {}
        // 4. 系统推荐(带旋转刷新按钮那一栏)
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD' && block.showType === 'HOMEPAGE_SLIDE_SONGLIST_ALIGN') {
            this.HOMEPAGE_BLOCK_STYLE_RCMD = block
          }
        } catch (error) {}
        // 5. 新歌新碟 \ 数字专辑
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG' && block.showType === 'HOMEPAGE_NEW_SONG_NEW_ALBUM') {
            this.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG = block
          }
        } catch (error) {}
        // 6.热门话题
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_HOT_TOPIC' && block.showType === 'HOT_TOPIC') {
            this.HOMEPAGE_BLOCK_HOT_TOPIC = block
          }
        } catch (error) {}
        // 7. 音乐日历
        try {
          if (block.blockCode === 'HOMEPAGE_MUSIC_CALENDAR' && block.showType === 'SHUFFLE_MUSIC_CALENDAR') {
            this.HOMEPAGE_MUSIC_CALENDAR = block
          }
        } catch (error) {}
        //   8. 精选音乐视频
        try {
          if (block.blockCode === 'HOMEPAGE_MUSIC_MLOG' && block.showType === 'HOMEPAGE_SLIDE_PLAYABLE_MLOG') {
            this.HOMEPAGE_MUSIC_MLOG = block
          }
        } catch (error) {}
        // 9.雷达歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_MGC_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            this.HOMEPAGE_BLOCK_MGC_PLAYLIST = block
          }
        } catch (error) {}
        // 10.专属场景歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            this.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST = block
          }
        } catch (error) {}
        // 11.热门播客
        try {
          if (block.blockCode === 'HOMEPAGE_VOICELIST_RCMD' && block.showType === 'SLIDE_PODCAST_VOICE_MORE_TAB') {
            this.HOMEPAGE_VOICELIST_RCMD = block
          }
        } catch (error) {}
        //12. 广播
        try {
          if (block.blockCode === 'HOMEPAGE_PODCAST24' && block.showType === 'SLIDE_PLAYABLE_DRAGON_BALL_NEW_BROADCAST') {
            this.HOMEPAGE_PODCAST24 = block
          }
        } catch (error) {}
        // 13. 云村出品
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_YUNCUN_PRODUCED' && block.showType === 'YUNCUN_PRODUCED') {
            this.HOMEPAGE_BLOCK_YUNCUN_PRODUCED = block
          }
        } catch (error) {}
        // 14. 视频合辑
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            this.HOMEPAGE_BLOCK_VIDEO_PLAYLIST = block
          }
        } catch (error) {}
        // 15.热评歌曲
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_NEW_HOT_COMMENT' && block.showType === 'NEW_HOT_COMMENT_WHITE_SKIN_V2') {
            this.HOMEPAGE_BLOCK_NEW_HOT_COMMENT = block
          }
        } catch (error) {}
        // 16.精品有声书
        try {
          if (block.blockCode === 'HOMEPAGE_VOICEBOOK_RCMD' && block.showType === 'SLIDE_RCMDLIKE_VOICELIST') {
            this.HOMEPAGE_VOICEBOOK_RCMD = block
          }
        } catch (error) {}
      })
      // console.log('-----indexData:', this)

      return this
    },
  },
})

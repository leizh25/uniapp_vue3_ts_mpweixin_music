// stores/counter.js
import { defineStore } from 'pinia'
import { request } from '@/utils/request.js'
export const useIndexDataStore = defineStore('indexData', {
  state: () => {
    return {
      HOMEPAGE_BANNER: {},
      HOMEPAGE_BLOCK_OLD_DRAGON_BALL: {},
      HOMEPAGE_BLOCK_PLAYLIST_RCMD: {},
      HOMEPAGE_BLOCK_STYLE_RCMD: {},
      HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: {},
      HOMEPAGE_BLOCK_HOT_TOPIC: {},
      HOMEPAGE_MUSIC_CALENDAR: {},
      HOMEPAGE_MUSIC_MLOG: {},
      HOMEPAGE_BLOCK_MGC_PLAYLIST: {},
      HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: {},
      HOMEPAGE_VOICELIST_RCMD: {},
      HOMEPAGE_PODCAST24: {},
      HOMEPAGE_BLOCK_YUNCUN_PRODUCED: {},
      HOMEPAGE_BLOCK_VIDEO_PLAYLIST: {},
      HOMEPAGE_BLOCK_NEW_HOT_COMMENT: {},
      HOMEPAGE_VOICEBOOK_RCMD: {},
    }
  },
  actions: {
    async init() {
      let result = {}
      let blocks = []
      //请求
      try {
        result = await request({
          url: '/homepage/block/page',
          // method: 'post',
        })
        // console.log('result: ', result)
        if (result.code !== 200) {
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
            this.HOMEPAGE_BANNER = block.extInfo.banners.map((obj) => {
              return {
                bannerId: obj.bannerId,
                pic: obj.pic,
                typeTitle: obj.typeTitle,
                url: obj.url,
                songName: obj.song?.name,
                songId: obj.song?.id,
                songAr: obj.song?.ar.map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                  }
                }),
              }
            })
          }
        } catch (error) {}

        //   2.龙舟
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_OLD_DRAGON_BALL' && block.showType === 'DRAGON_BALL') {
            this.HOMEPAGE_BLOCK_OLD_DRAGON_BALL = block.creatives[0].resources.map((obj) => {
              return {
                creativeType: block.creatives[0].creativeType,
                resourceType: obj.resourceType,
                title: obj.uiElement.mainTitle.title,
                imageUrl: obj.uiElement.image.imageUrl,
                imageUrl2: obj.uiElement.image.imageUrl2,
              }
            })
          }
        } catch (error) {}

        //   3. 推荐歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            let all = {}
            all.scroll_playlist = {}
            all.playlist = {}
            all.playlist.res = []
            all.title = block.uiElement.subTitle.title
            block.creatives.forEach((obj) => {
              if (obj.creativeType === 'scroll_playlist') {
                all.scroll_playlist.creativeType = obj.creativeType
                all.scroll_playlist.title = obj.uiElement.mainTitle.title
                all.scroll_playlist.imageUrl = obj.uiElement.image.imageUrl
                all.scroll_playlist.labelTexts = obj.uiElement.labelTexts
                all.scroll_playlist.res = obj.resources.map((item) => {
                  return {
                    title: item.uiElement.mainTitle.title,
                    imageUrl: item.uiElement.image.imageUrl,
                    labelTexts: item.uiElement.labelTexts,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                    playCount: item.resourceExtInfo.playCount,
                    userAvatar: item.resourceExtInfo.users?.[0].avatarUrl,
                  }
                })
              }
              if (obj.creativeType === 'list') {
                all.playlist.creativeType = obj.creativeType
                all.playlist.res.push({
                  creativeId: obj.creativeId,
                  title: obj.uiElement.mainTitle.title,
                  imageUrl: obj.uiElement.image.imageUrl,
                  resourceType: obj.resources[0].resourceType,
                  resourceId: obj.resources[0].resourceId,
                  playCount: obj.resources[0].resourceExtInfo.playCount,
                })
              }
            })
            this.HOMEPAGE_BLOCK_PLAYLIST_RCMD = all
          }
        } catch (error) {}

        // 4. 系统推荐(带旋转刷新按钮那一栏)
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_STYLE_RCMD' && block.showType === 'HOMEPAGE_SLIDE_SONGLIST_ALIGN') {
            let res = block.creatives.map((obj) => {
              if (obj.creativeType === 'SONG_LIST_HOMEPAGE') {
                return obj.resources.map((item) => {
                  return {
                    mainTitle: item.uiElement.mainTitle.title,
                    subTitle: item.uiElement.subTitle?.title,
                    imageUrl: item.uiElement.image.imageUrl,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                    playCount: item.uiElement.playCount,
                    songName: item.resourceExtInfo.song.name,
                    mvid: item.resourceExtInfo.songData.mvid,
                    songAr: item.resourceExtInfo.artists.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                      }
                    }),
                  }
                })
              }
            })
            this.HOMEPAGE_BLOCK_STYLE_RCMD = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}

        // 5. 新歌新碟 \ 数字专辑
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG' && block.showType === 'HOMEPAGE_NEW_SONG_NEW_ALBUM') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                resources: obj.resources.map((item) => {
                  return {
                    mainTitle: item.uiElement.mainTitle.title,
                    subTitle: item.uiElement.subTitle.title,
                    imageUrl: item.uiElement.image.imageUrl,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                    fee: item.resourceExtInfo.songData?.fee,
                    artists: (item.resourceExtInfo.songData ? item.resourceExtInfo.songData : item.resourceExtInfo).artists.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                      }
                    }),
                  }
                }),
              }
            })
            this.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}
        // 6.热门话题
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_HOT_TOPIC' && block.showType === 'HOT_TOPIC') {
            let arr = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                resources: obj.resources.map((item) => {
                  return {
                    mainTitle: item.uiElement.mainTitle.title,
                    subTitle: item.uiElement.subTitle.title,
                    imageUrl: item.uiElement.image.imageUrl,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                    userNickname: item.resourceExtInfo.user.nickname,
                    userAvatarUrl: item.resourceExtInfo.user.avatarUrl,
                    backgroundUrl: item.resourceExtInfo.user.backgroundUrl,
                    eventMsg: item.resourceExtInfo.eventMsg,
                  }
                }),
              }
            })
            this.HOMEPAGE_BLOCK_HOT_TOPIC = {
              title: block.uiElement.subTitle.title,
              resources: arr,
            }
          }
        } catch (error) {}

        // 7. 音乐日历
        try {
          if (block.blockCode === 'HOMEPAGE_MUSIC_CALENDAR' && block.showType === 'SHUFFLE_MUSIC_CALENDAR') {
            let resource = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                title: block.uiElement.subTitle.title,
                resources: obj.resources.map((item) => {
                  return {
                    title: item.uiElement.mainTitle.title,
                    image: item.uiElement.image.imageUrl,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                  }
                }),
              }
            })
            this.HOMEPAGE_MUSIC_CALENDAR = {
              title: block.uiElement.subTitle.title,
              text: block.uiElement.button.text,
              resources: resource,
            }
          }
        } catch (error) {}
        //   8. 精选音乐视频
        try {
          if (block.blockCode === 'HOMEPAGE_MUSIC_MLOG' && block.showType === 'HOMEPAGE_SLIDE_PLAYABLE_MLOG') {
            let res = block.extInfo.map((obj, index) => {
              //   console.log('index: ', index)
              return {
                id: obj.id,
                text: obj.resource.mlogBaseData.text,
                shareUrl: obj.resource.shareUrl,
                mlogBaseDataType: obj.mlogBaseDataType,
                user: obj.resource.userProfile
                  ? {
                      userId: obj.resource.userProfile?.userId,
                      nickname: obj.resource.userProfile?.nickname,
                      avatarUrl: obj.resource.userProfile?.avatarUrl,
                    }
                  : null,
                videos: (() => {
                  if (obj.mlogBaseDataType == 2) {
                    return [
                      {
                        videoKey: obj.resource.mlogBaseData.video.videoKey,
                        duration: obj.resource.mlogBaseData.video.duration,
                        frameUrl: obj.resource.mlogBaseData.video.frameUrl,
                        duration: obj.resource.mlogBaseData.video.duration,
                        playCount: obj.resource.mlogBaseData.video.playCount,
                      },
                    ]
                  } else if (obj.mlogBaseDataType == 3) {
                    return obj.resource.mlogBaseData.videos.map((item) => {
                      return {
                        url: item.url,
                        duration: item.duration,
                        size: item.size,
                        type: item.tagSign.type,
                      }
                    })
                  }
                })(),
              }
            })
            this.HOMEPAGE_MUSIC_MLOG = {
              title: block.uiElement.subTitle.title,
              titleImgUrl: block.uiElement.subTitle.titleImgUrl,
              res,
            }
          }
        } catch (error) {}
        // 9.雷达歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_MGC_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                title: obj.resources[0].uiElement.mainTitle.title,
                imageUrl: obj.resources[0].uiElement.image.imageUrl,
                resourceType: obj.resources[0].resourceType,
                resourceId: obj.resources[0].resourceId,
                playCount: obj.resources[0].resourceExtInfo.playCount,
              }
            })
            this.HOMEPAGE_RADAR_SONG_LIST = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}
        // 10.专属场景歌单
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                title: obj.uiElement.mainTitle.title,
                imageUrl: obj.uiElement.image.imageUrl,
                resourceType: obj.resources[0].resourceType,
                resourceId: obj.resources[0].resourceId,
                playCount: obj.resources[0].resourceExtInfo.playCount,
              }
            })
            this.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}
        // 11.热门播客
        try {
          if (block.blockCode === 'HOMEPAGE_VOICELIST_RCMD' && block.showType === 'SLIDE_PODCAST_VOICE_MORE_TAB') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                title: obj.uiElement.mainTitle.title,
                data: obj.resources.map((item) => {
                  return {
                    title: item.uiElement.mainTitle.title,
                    subTitle: item.uiElement.subTitle.title,
                    imageUrl: item.uiElement.image.imageUrl,
                    resourceType: item.resourceType,
                    resourceId: item.resourceId,
                    labelTexts: item.uiElement.labelTexts,
                    mainTrackId: item.resourceExtInfo.djProgram.mainTrackId,
                  }
                }),
              }
            })
            this.HOMEPAGE_VOICELIST_RCMD = {
              res,
            }
          }
        } catch (error) {}

        //12. 广播
        try {
          if (block.blockCode === 'HOMEPAGE_PODCAST24' && block.showType === 'SLIDE_PLAYABLE_DRAGON_BALL_NEW_BROADCAST') {
            let res = block.creatives[0].resources.map((obj) => {
              return {
                resourceType: obj.resourceType,
                // bug:undefined
                resourceUrl: decodeURIComponent(obj.resourceUrl).split('fallbackURL=')[1],
                title: obj.uiElement.mainTitle.title,
                imageUrl: obj.uiElement.image.imageUrl,
              }
            })
            this.HOMEPAGE_PODCAST24 = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}

        // 13. 云村出品
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_YUNCUN_PRODUCED' && block.showType === 'YUNCUN_PRODUCED') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                mainTitle: obj.uiElement.mainTitle.title,
                subTitle: obj.uiElement.subTitle.title,
                title: obj.uiElement.mainTitle.title,
                imageUrl: obj.uiElement.image.imageUrl,
              }
            })
            this.HOMEPAGE_BLOCK_YUNCUN_PRODUCED = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}

        // 14. 视频合辑
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                title: obj.uiElement.mainTitle.title,
                imageUrl: obj.uiElement.image.imageUrl,
                labelTexts: obj.uiElement.labelTexts,
                playCount: obj.resources[0].resourceExtInfo.playCount,
              }
            })
            this.HOMEPAGE_BLOCK_VIDEO_PLAYLIST = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}

        // 15.热评歌曲
        try {
          if (block.blockCode === 'HOMEPAGE_BLOCK_NEW_HOT_COMMENT' && block.showType === 'NEW_HOT_COMMENT_WHITE_SKIN_V2') {
            let res = block.creatives.map((obj) => {
              return {
                creativeType: obj.creativeType,
                creativeId: obj.creativeId,
                titleDesc: obj.uiElement.mainTitle.titleDesc,
                songData: {
                  name: obj.resources[0].resourceExtInfo.songData.name,
                  id: obj.resources[0].resourceExtInfo.songData.id,
                  type: obj.resources[0].resourceExtInfo.songData.type,
                  picUrl: obj.resources[0].resourceExtInfo.songData.picUrl,
                  mvid: obj.resources[0].resourceExtInfo.songData.mvid,
                  artists: obj.resources[0].resourceExtInfo.songData.artists.map((item) => {
                    return {
                      name: item.name,
                      id: item.id,
                      img1v1Url: item.img1v1Url,
                    }
                  }),
                },
              }
            })
            this.HOMEPAGE_BLOCK_NEW_HOT_COMMENT = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}

        // 16.精品有声书
        try {
          if (block.blockCode === 'HOMEPAGE_VOICEBOOK_RCMD' && block.showType === 'SLIDE_RCMDLIKE_VOICELIST') {
            let res = block.creatives.map((item) => {
              return {
                creativeType: item.creativeType,
                creativeId: item.creativeId,
                title: item.uiElement.mainTitle.title,
                imageUrl: item.uiElement.image.imageUrl,
                labelTexts: item.uiElement.labelTexts,
              }
            })
            this.HOMEPAGE_VOICEBOOK_RCMD = {
              title: block.uiElement.subTitle.title,
              res,
            }
          }
        } catch (error) {}
      })
      return this
    },
  },
})

// import res from "./mock.json"
const res = require('./mock.json')
// console.log('res: ', res)
const blocks = res.data.blocks

/* 


1  HOMEPAGE_BANNER     BANNER    轮播图
2  HOMEPAGE_BLOCK_OLD_DRAGON_BALL     DRAGON_BALL  横向滚动按钮
3  HOMEPAGE_BLOCK_PLAYLIST_RCMD     HOMEPAGE_SLIDE_PLAYLIST   推荐歌单
4  HOMEPAGE_BLOCK_STYLE_RCMD     HOMEPAGE_SLIDE_SONGLIST_ALIGN   系统推荐(带旋转刷新按钮那一栏)
5  HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG     HOMEPAGE_NEW_SONG_NEW_ALBUM    新歌新碟 \ 数字专辑
6  HOMEPAGE_BLOCK_HOT_TOPIC     HOT_TOPIC    热门话题 (左右滑块)
7  HOMEPAGE_MUSIC_CALENDAR     SHUFFLE_MUSIC_CALENDAR    音乐日历
8  HOMEPAGE_MUSIC_MLOG     HOMEPAGE_SLIDE_PLAYABLE_MLOG    精选音乐视频
9  HOMEPAGE_BLOCK_MGC_PLAYLIST     HOMEPAGE_SLIDE_PLAYLIST    雷达歌单
10 HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST     HOMEPAGE_SLIDE_PLAYLIST    专属场景歌单
11 HOMEPAGE_VOICELIST_RCMD     SLIDE_PODCAST_VOICE_MORE_TAB    热门播客
12 HOMEPAGE_PODCAST24     SLIDE_PLAYABLE_DRAGON_BALL_NEW_BROADCAST    广播
13 HOMEPAGE_BLOCK_YUNCUN_PRODUCED     YUNCUN_PRODUCED    云村出品
14 HOMEPAGE_BLOCK_VIDEO_PLAYLIST     HOMEPAGE_SLIDE_PLAYLIST    视频合辑
15 HOMEPAGE_BLOCK_NEW_HOT_COMMENT     NEW_HOT_COMMENT_WHITE_SKIN_V2     热评歌曲
16 HOMEPAGE_VOICEBOOK_RCMD     SLIDE_RCMDLIKE_VOICELIST    精品有声书


*/

let HOMEPAGE_BANNER = {}
let HOMEPAGE_BLOCK_OLD_DRAGON_BALL = {}
let HOMEPAGE_BLOCK_PLAYLIST_RCMD = {}
let HOMEPAGE_BLOCK_STYLE_RCMD = {}
let HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG = {}
let HOMEPAGE_BLOCK_HOT_TOPIC = {}
let HOMEPAGE_MUSIC_CALENDAR = {}
let HOMEPAGE_MUSIC_MLOG = {}
let HOMEPAGE_BLOCK_MGC_PLAYLIST = {}
let HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST = {}
let HOMEPAGE_VOICELIST_RCMD = {}
let HOMEPAGE_PODCAST24 = {}
let HOMEPAGE_BLOCK_YUNCUN_PRODUCED = {}
let HOMEPAGE_BLOCK_VIDEO_PLAYLIST = {}
let HOMEPAGE_BLOCK_NEW_HOT_COMMENT = {}
let HOMEPAGE_VOICEBOOK_RCMD = {}

blocks.forEach((block) => {
  // console.log(`console.log(${block.blockCode})`);
  //   1. 轮播图
  if (block.blockCode === 'HOMEPAGE_BANNER' && block.showType === 'BANNER') {
    HOMEPAGE_BANNER = block.extInfo.banners.map((obj) => {
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
  //   2.龙舟
  if (block.blockCode === 'HOMEPAGE_BLOCK_OLD_DRAGON_BALL' && block.showType === 'DRAGON_BALL') {
    HOMEPAGE_BLOCK_OLD_DRAGON_BALL = block.creatives[0].resources.map((obj) => {
      return {
        creativeType: block.creatives[0].creativeType,
        resourceType: obj.resourceType,
        title: obj.uiElement.mainTitle.title,
        imageUrl: obj.uiElement.image.imageUrl,
        imageUrl2: obj.uiElement.image.imageUrl2,
      }
    })
  }
  //   3. 推荐歌单
  if (block.blockCode === 'HOMEPAGE_BLOCK_PLAYLIST_RCMD' && block.showType === 'HOMEPAGE_SLIDE_PLAYLIST') {
    let all = {}
    all.title = block.uiElement.subTitle.title
    block.creatives.forEach((obj) => {
      if (obj.creativeType === 'scroll_playlist') {
        all.scroll_playlist = {}
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
        all.playlist = {}
        all.playlist.creativeType = obj.creativeType
        all.playlist.res = []
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
    HOMEPAGE_BLOCK_PLAYLIST_RCMD = all
  }
  // 4. 系统推荐(带旋转刷新按钮那一栏)
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
            mvid:item.resourceExtInfo.songData.mvid,
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
    HOMEPAGE_BLOCK_STYLE_RCMD = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }
  // 5. 新歌新碟 \ 数字专辑
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

    HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }
  // 6.热门话题
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
            userIdUrl: item.resourceExtInfo.user.avatarUrl,
            backgroundUrl: item.resourceExtInfo.user.backgroundUrl,
            eventMsg: item.resourceExtInfo.eventMsg,
          }
        }),
      }
    })
    HOMEPAGE_BLOCK_HOT_TOPIC = {
      title: block.uiElement.subTitle.title,
      resources: arr,
    }
  }
  // 7. 音乐日历
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
    HOMEPAGE_MUSIC_CALENDAR = {
      title: block.uiElement.subTitle.title,
      text: block.uiElement.button.text,
      resources: resource,
    }
  }
  //   8. 精选音乐视频
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
    HOMEPAGE_MUSIC_MLOG = {
      title: block.uiElement.subTitle.title,
      titleImgUrl: block.uiElement.subTitle.titleImgUrl,
      res,
    }
  }
  // 9.雷达歌单
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
    HOMEPAGE_RADAR_SONG_LIST = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }
  // 10.专属场景歌单
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
    HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }
  // 11.热门播客
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
    HOMEPAGE_VOICELIST_RCMD = {
      res,
    }
  }

  //12. 广播
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
    HOMEPAGE_PODCAST24 = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }

  // 13. 云村出品
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
    HOMEPAGE_BLOCK_YUNCUN_PRODUCED = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }

  // 14. 视频合辑
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
    HOMEPAGE_BLOCK_VIDEO_PLAYLIST = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }

  // 15.热评歌曲
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

    HOMEPAGE_BLOCK_NEW_HOT_COMMENT = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }

  // 16.精品有声书
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

    HOMEPAGE_VOICEBOOK_RCMD = {
      title: block.uiElement.subTitle.title,
      res,
    }
  }
})
// console.log(HOMEPAGE_VOICEBOOK_RCMD)
// console.log(JSON.stringify(HOMEPAGE_VOICEBOOK_RCMD))

// console.log(HOMEPAGE_BANNER)
// console.log(HOMEPAGE_BLOCK_OLD_DRAGON_BALL)
console.log(HOMEPAGE_BLOCK_PLAYLIST_RCMD)
// console.log(HOMEPAGE_BLOCK_STYLE_RCMD)
// console.log(HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG)
// console.log(HOMEPAGE_BLOCK_HOT_TOPIC)
// console.log(HOMEPAGE_MUSIC_CALENDAR)
// console.log(HOMEPAGE_MUSIC_MLOG)
// console.log(HOMEPAGE_BLOCK_MGC_PLAYLIST)
// console.log(HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST)
// console.log(HOMEPAGE_VOICELIST_RCMD)
// console.log(HOMEPAGE_PODCAST24)
// console.log(HOMEPAGE_BLOCK_YUNCUN_PRODUCED)
// console.log(HOMEPAGE_BLOCK_VIDEO_PLAYLIST)
// console.log(HOMEPAGE_BLOCK_NEW_HOT_COMMENT)
// console.log(HOMEPAGE_VOICEBOOK_RCMD)

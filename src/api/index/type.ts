export interface Response {
  code: number
}

/**
 * 首页数据的接口返回的数据类型
 */
export interface HomepageResponse extends Response {
  message: string
  data: {
    cursor: string
    blocks: [
      // 1 轮播图
      HOMEPAGE_BANNER,
      // 2 龙舟
      HOMEPAGE_BLOCK_OLD_DRAGON_BALL,
      // 3 推荐歌单
      HOMEPAGE_BLOCK_PLAYLIST_RCMD,
      // 4 系统推荐
      HOMEPAGE_BLOCK_STYLE_RCMD,
      // 5 新歌新碟 \ 数字专辑
      HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG,
      // 6 热门话题
      HOMEPAGE_BLOCK_HOT_TOPIC,
      // 7 音乐日历
      HOMEPAGE_MUSIC_CALENDAR,
      // 8 精选音乐视频
      HOMEPAGE_MUSIC_MLOG,
      // 9 雷达歌单
      HOMEPAGE_BLOCK_MGC_PLAYLIST,
      // 10 专属场景歌单
      HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST,
      // 11 热门播客
      HOMEPAGE_VOICELIST_RCMD,
      // 12 广播
      HOMEPAGE_PODCAST24,
      // 13 云村出品
      HOMEPAGE_BLOCK_YUNCUN_PRODUCED,
      // 14 视频合辑
      HOMEPAGE_BLOCK_VIDEO_PLAYLIST,
      // 15 热评歌曲
      HOMEPAGE_BLOCK_NEW_HOT_COMMENT,
      // 16 精品有声书
      HOMEPAGE_VOICEBOOK_RCMD,
    ]
  }
}

/**
 * 轮播图接口响应数据类型
 */
export interface BannerResponse extends Response {
  banners: banner[]
}

/**
 * 仓库数据类型
 */
export interface IndexData {
  // 1 轮播图
  HOMEPAGE_BANNER: HOMEPAGE_BANNER
  // 2 龙舟
  HOMEPAGE_BLOCK_OLD_DRAGON_BALL: HOMEPAGE_BLOCK_OLD_DRAGON_BALL
  // 3 推荐歌单
  HOMEPAGE_BLOCK_PLAYLIST_RCMD: HOMEPAGE_BLOCK_PLAYLIST_RCMD
  // 4 系统推荐
  HOMEPAGE_BLOCK_STYLE_RCMD: HOMEPAGE_BLOCK_STYLE_RCMD
  // 5 新歌新碟 \ 数字专辑
  HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG
  // 6 热门话题
  HOMEPAGE_BLOCK_HOT_TOPIC: HOMEPAGE_BLOCK_HOT_TOPIC
  // 7 音乐日历
  HOMEPAGE_MUSIC_CALENDAR: HOMEPAGE_MUSIC_CALENDAR
  // 8 精选音乐视频
  HOMEPAGE_MUSIC_MLOG: HOMEPAGE_MUSIC_MLOG
  // 9 雷达歌单
  HOMEPAGE_BLOCK_MGC_PLAYLIST: HOMEPAGE_BLOCK_MGC_PLAYLIST
  // 10 专属场景歌单
  HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST
  // 11 热门播客
  HOMEPAGE_VOICELIST_RCMD: HOMEPAGE_VOICELIST_RCMD
  // 12 广播
  HOMEPAGE_PODCAST24: HOMEPAGE_PODCAST24
  // 13 云村出品
  HOMEPAGE_BLOCK_YUNCUN_PRODUCED: HOMEPAGE_BLOCK_YUNCUN_PRODUCED
  // 14 视频合辑
  HOMEPAGE_BLOCK_VIDEO_PLAYLIST: HOMEPAGE_BLOCK_VIDEO_PLAYLIST
  // 15 热评歌曲
  HOMEPAGE_BLOCK_NEW_HOT_COMMENT: HOMEPAGE_BLOCK_NEW_HOT_COMMENT
  // 16 精品有声书
  HOMEPAGE_VOICEBOOK_RCMD: HOMEPAGE_VOICEBOOK_RCMD
  // 推荐歌单 上下轮播
  HOMEPAGE_BLOCK_PLAYLIST_RCMD_SCROLL_LIST: creative3_1
  // 推荐歌单 左右滑动
  HOMEPAGE_BLOCK_PLAYLIST_RCMD_LIST: creative3_1[]
}

/**
 * 1.HOMEPAGE_BANNER
 * @name 轮播图
 */
export interface HOMEPAGE_BANNER {
  blockCode?: 'HOMEPAGE_BANNER'
  showType?: 'BANNER'
  extInfo?: {
    banners: banner[]
  }
}
// ====================== 1 ====================
export interface banner {
  bannerId: string
  pic: string
  targetId: number
  titleColor: string
  typeTitle: string
  url: null | string
  song: null | song
}
export interface song {
  name?: string
  id?: number
  ar?: artist[]
  alia?: string[]
  pop?: number
  fee?: fee
  al?: album
  dt?: number
  mark?: number
  cp?: number
  mv?: number
  albumName?: string
  publishTime?: number
}
export interface artist {
  id: number
  name: string
  img1v1Url: string
}
export interface album {
  id: number
  name: string
  picUrl: string
  type: string
  size: number
  publishTime: number
  img1v1Url: string
  artist: artist
  artists: artist[]
  subType: string
}
// 歌曲付费类型
export type fee = 0 | 1 | 8
// ====================== 1 ====================
/**
 * 2.HOMEPAGE_BLOCK_OLD_DRAGON_BALL
 * @name 龙舟
 */
export interface HOMEPAGE_BLOCK_OLD_DRAGON_BALL {
  blockCode?: 'HOMEPAGE_BLOCK_OLD_DRAGON_BALL'
  showType?: 'DRAGON_BALL'
  creatives?: creative2[]
}
// ====================== 2 ====================
export interface creative2 {
  creativeType: creativeType
  resources: resource2[]
}
export interface resource2 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
      imageUrl2: string
    }
  }
}
// ====================== 2 ====================
type creativeType = 'DRAGON_BALL' | 'scroll_playlist' | 'list' | 'SONG_LIST_HOMEPAGE' | 'NEW_SONG_HOMEPAGE' | 'topic'
/**
 * 3.HOMEPAGE_BLOCK_PLAYLIST_RCMD
 * @name 方块推荐歌单
 */
export interface HOMEPAGE_BLOCK_PLAYLIST_RCMD {
  blockCode?: 'HOMEPAGE_BLOCK_PLAYLIST_RCMD'
  showType?: 'HOMEPAGE_SLIDE_PLAYLIST'
  uiElement?: uiElement3
  creatives?: creative3_1[]
}
// ====================== 3 ====================
type resourceType = 'list' | 'song'
export interface uiElement3 {
  subTitle: {
    title: string
  }
}
export interface creative3_1 {
  creativeType?: creativeType
  creativeId?: string
  resources?: resource3_1[]
  uiElement?: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
  }
}
export interface resource3_1 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    playCount: number
    users: [
      {
        followed: boolean
        avatarUrl: string
        userId: number
        nickname: string
      },
    ]
  }
}
// export interface creative3_2 {
//   creativeType: creativeType
//   creativeId: string
//   uiElement: {
//     mainTitle: {
//       title: string
//     }
//     subTitle: {
//       title: string
//     }
//     image: {
//       imageUrl: string
//     }
//     labelTexts: string[]
//   }
//   resources: resource3_2[]
// }
// export interface resource3_2 {
//   uiElement: {
//     mainTitle: {
//       title: string
//     }
//     subTitle: {
//       title: string
//     }
//     image: {
//       imageUrl: string
//     }
//     labelTexts: string[]
//   }
//   resourceType: resourceType
//   resourceId: string
//   resourceExtInfo: {
//     playCount: number
//   }
//   logInfo: string
// }
// ====================== 3 ====================

/**
 * 4.HOMEPAGE_BLOCK_STYLE_RCMD
 * @name 风格推荐
 */
export interface HOMEPAGE_BLOCK_STYLE_RCMD {
  blockCode?: 'HOMEPAGE_BLOCK_STYLE_RCMD'
  showType?: 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: [
    {
      creativeType: creativeType
      resources: resource4_1[]
    },
  ]
  resourceIdList?: string[]
}
// ====================== 4 ====================
export interface resource4_1 {
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    artists: artist[]
    song: song
    songData: songData
  }
  logInfo: string
}
export interface songData {
  name: string
  id: number
  fee: fee
  artists: artist[]
  album: album
  starred: false
  popularity: number
  score: number
  starredNum: number
  duration: number
  playedNum: number
  hasListened: boolean
  songPrivilege: privilege
  mvid: number
}
export interface privilege {
  id: number
  fee: fee
  payed: number
}
// ====================== 4 ====================

/**
 * 5.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG
 * @name 新歌新碟 \ 数字专辑
 */
export interface HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG {
  blockCode?: 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG'
  showType?: 'HOMEPAGE_NEW_SONG_NEW_ALBUM'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative5_1[]
}
// ====================== 5 ====================
export interface creative5_1 {
  creativeType: creativeType
  uiElement: {
    mainTitle: {
      title: string
    }
    button: {
      text: '更多'
    }
  }
  resources: resource5_1[]
}
export interface resource5_1 {
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: string
      rcmdText: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    artists: artist[]
    songData: songData
    hasListened: boolean
    songPrivilege: privilege
  }
}
// ====================== 5 ====================
/**
 * 6.HOMEPAGE_BLOCK_HOT_TOPIC
 * @name 热门话题
 */
export interface HOMEPAGE_BLOCK_HOT_TOPIC {
  blockCode?: 'HOMEPAGE_BLOCK_HOT_TOPIC'
  showType?: 'HOT_TOPIC'
  uiElement?: {
    subTitle: {
      title: string
    }
  }
  creatives?: creative6_1[]
}
// ====================== 6 ====================
export interface creative6_1 {
  creativeType: string
  creativeId: string
  resources: resource6_1[]
}
export interface resource6_1 {
  uiElement: {
    mainTitle: {
      title: string
      titleImgUrl: string
    }
    subTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: string
  resourceId: string
  resourceExtInfo: {
    user: user
    eventMsg: string
    hasListened: boolean
  }
}
export interface user {
  userId: number
  userType: number
  nickname: string
  avatarUrl: string
  backgroundUrl: string
  createTime: number
  userName: string
  accountType: number
  shortUserName: number
  vipType: number
  lastLoginTime: number
  lastLoginIP: string
}

// ====================== 6 ====================
/**
 * 7.HOMEPAGE_MUSIC_CALENDAR
 * @name 音乐日历
 */
export interface HOMEPAGE_MUSIC_CALENDAR {
  blockCode?: 'HOMEPAGE_MUSIC_CALENDAR'
  showType?: 'SHUFFLE_MUSIC_CALENDAR'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative7_1[]
}
// ====================== 7 ====================
export interface creative7_1 {
  creativeType: 'HOMEPAGE_MUSIC_EVENT'
  creativeId: 'artistPreviewEvent_12316290_2218720'
  code: 'HOMEPAGE_MUSIC_CALENDAR'
  resources: rescource7_1[]
}

export interface rescource7_1 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: 'ALBUM'
  resourceId: string
  resourceExtInfo: {
    startTime: number
    endTime: number
    subCount: number
    subed: boolean
    canSubscribe: boolean
    hasListened: boolean
  }
}
// ====================== 7 ====================
/**
 * 8.HOMEPAGE_MUSIC_MLOG
 * @name 精选音乐视频
 */
export interface HOMEPAGE_MUSIC_MLOG {
  blockCode?: 'HOMEPAGE_MUSIC_MLOG'
  showType?: 'HOMEPAGE_SLIDE_PLAYABLE_MLOG'
  uiElement?: {
    subTitle: {
      title: string
      titleImgUrl: string
    }
    button: {
      text: string
    }
  }
  extInfo?: extInfo[]
}
// ====================== 8 ====================
export interface extInfo {
  id: 'a1M3OGeJkC5vKev'
  type: 1
  mlogBaseDataType: 2
  resource: resource8_1
  reason: string
}
export interface resource8_1 {
  mlogBaseData: mlogBaseData
  mlogExtVO: mlogExtVO
  userProfile: userProfile
  status: number
  shareUrl: string
}
export interface mlogBaseData {
  id: string
  type: number
  originalTitle: string
  text: string
  desc: string
  pubTime: number
  coverUrl: string
  coverHeight: 1280
  coverWidth: 720
  audio: null
  duration: 13840
  video: video
}
export interface video {
  videoKey: string
  duration: number
  coverUrl: string
  frameUrl: string
  frameImage: {
    picKey: string
    imageUrl: string
    width: number
    height: number
  }
  width: number
  height: number
  urlInfo: {
    id: string
    size: number
  }
}
export interface mlogExtVO {
  likedCount: number
  commentCount: number
  playCount: number
  song: song
  canCollect: boolean
  specialTag: string
}
export interface userProfile {
  userId: number
  nickname: string
  avatarUrl: string
  followed: boolean
  userType: number
  avatarDetail: {
    userType: number
    identityIconUrl: string
  }
}

// ====================== 8 ====================

/**
 * 9.HOMEPAGE_BLOCK_MGC_PLAYLIST
 * @name 雷达歌单
 */
export interface HOMEPAGE_BLOCK_MGC_PLAYLIST {
  blockCode?: 'HOMEPAGE_BLOCK_MGC_PLAYLIST'
  showType?: 'HOMEPAGE_SLIDE_PLAYLIST'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative9_1[]
}
// ====================== 9 ====================
export interface creative9_1 {
  creativeType: creativeType
  creativeId: string
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resources: rescource9_1[]
  logInfo: string
}
export interface rescource9_1 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    playCount: number
  }
  logInfo: string
}
// ====================== 9 ====================

/**
 * 10.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST
 * @name 专属场景歌单
 */
export interface HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST {
  blockCode?: 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST'
  showType?: 'HOMEPAGE_SLIDE_PLAYLIST'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative10[]
}
// ====================== 10 ====================
export interface creative10 {
  creativeType: string
  creativeId: string
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resources: resource10[]
}
export interface resource10 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    playCount: number
  }
}
// ====================== 10 ====================
/**
 * 11.HOMEPAGE_VOICELIST_RCMD
 * @name 热门播客
 */
export interface HOMEPAGE_VOICELIST_RCMD {
  blockCode?: 'HOMEPAGE_VOICELIST_RCMD'
  showType?: 'SLIDE_PODCAST_VOICE_MORE_TAB'
  creatives?: creative11[]
}
export interface creative11 {
  creativeType?: 'VOICE_LIST_HOMEPAGE'
  uiElement?: {
    mainTitle: {
      title: string
    }
    button: {
      text: '更多'
    }
  }
  resources?: resource11[]
}
export interface resource11 {
  uiElement?: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
    labelType: string
  }
  resourceType?: resourceType
  resourceId?: string
  resourceExtInfo?: {
    djProgram: {
      subscribedCount: number
      reward: false
      mainTrackId: number
      listenerCount: number
      name: string
      id: number
      description: string
      userId: number
      coverUrl: string
      updateTime: number
      categoryId: number
      category: string
      secondCategory: string
      duration: number
      mainSong: {
        name: string
        id: number
        status: number
        fee: fee
        artists: artist[]
        duration: number
      }
    }
  }
}

/**
 * 12.HOMEPAGE_PODCAST24
 * @name 广播
 */
export interface HOMEPAGE_PODCAST24 {
  blockCode?: 'HOMEPAGE_PODCAST24'
  showType?: 'SLIDE_PLAYABLE_DRAGON_BALL_NEW_BROADCAST'
  uiElement?: {
    subTitle: {
      title: string
    }
  }
  creatives?: creative11[]
}
// ====================== 12 ====================
export interface creative12 {
  creativeType: 'PLAYABLE_DRAGON_BALL_NEW_BROADCAST'
  uiElement: {
    mainTitle: {
      title: string
    }
  }
  resources: resource12[]
}
export interface resource12 {
  uiElement: {
    mainTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
  }
  resourceType: 'fm_radio'
  resourceUrl: string
}
// ====================== 12 ====================

/**
 * 13.HOMEPAGE_BLOCK_YUNCUN_PRODUCED
 * @name 云村出品
 */
export interface HOMEPAGE_BLOCK_YUNCUN_PRODUCED {
  blockCode?: 'HOMEPAGE_BLOCK_YUNCUN_PRODUCED'
  showType?: 'YUNCUN_PRODUCED'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative12[]
}

/**
 * 14.HOMEPAGE_BLOCK_VIDEO_PLAYLIST
 * @name 视频合辑
 */
export interface HOMEPAGE_BLOCK_VIDEO_PLAYLIST {
  blockCode?: 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST'
  showType?: 'HOMEPAGE_SLIDE_PLAYLIST'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative13[]
}
// ====================== 13 ====================
export interface creative13 {
  creativeType: 'YUNCUN_PRODUCED'
  action: string
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
  }
  resources: resource13[]
}
export interface resource13 {
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: ''
    }
    image: {
      imageUrl: string
    }
  }
  action: string
}
// ====================== 13 ====================

/**
 * 15.HOMEPAGE_BLOCK_NEW_HOT_COMMENT
 * @name 热评歌曲
 */
export interface HOMEPAGE_BLOCK_NEW_HOT_COMMENT {
  blockCode?: 'HOMEPAGE_BLOCK_NEW_HOT_COMMENT'
  showType?: 'NEW_HOT_COMMENT_WHITE_SKIN_V2'
  uiElement?: {
    subTitle: {
      title: string
    }
  }
  creatives?: creative14[]
}

// ====================== 14 ====================
export interface creative14 {
  creativeType: creativeType
  creativeId: string
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: ''
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
  }
  resources: resource14[]
}
export interface resource14 {
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle: {
      title: string
    }
    image: {
      imageUrl: string
    }
    labelTexts: string[]
  }
  resourceType: resourceType
  resourceId: string
  resourceExtInfo: {
    playCount: number
  }
}
// ====================== 14 ====================
// ====================== 15 ====================

/**
 * 16.HOMEPAGE_VOICEBOOK_RCMD
 * @name 精品有声书
 */
export interface HOMEPAGE_VOICEBOOK_RCMD {
  blockCode?: 'HOMEPAGE_VOICEBOOK_RCMD'
  showType?: 'SLIDE_RCMDLIKE_VOICELIST'
  uiElement?: {
    subTitle: {
      title: string
    }
    button: {
      text: string
    }
  }
  creatives?: creative15[]
}
export interface creative15 {
  creativeType: 'COMMENT_DETAIL'
  creativeId: string
  uiElement: {
    mainTitle: {
      titleDesc: string
    }
    resources: resource15[]
  }
}
export interface resource15 {
  uiElement: {
    mainTitle: {
      titleDesc: string
    }
  }
  resourceId: string
  resourceExtInfo: {
    users: user[]
    songData: songData
  }
  algReason: string
}
// ====================== 15 ====================
// ====================== 16 ====================
// export interface creative16 {
//   creativeType?: 'voiceList'
//   creativeId?: string
//   uiElement?: {
//     mainTitle: {
//       title: string
//     }
//     image: {
//       imageUrl: string
//     }
//     labelTexts: string[]
//   }
//   creativeExtInfoVO?: {
//     playCount: number
//   }
// }
// ====================== 16 ====================

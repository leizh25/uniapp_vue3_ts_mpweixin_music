interface Response {
  code: number
}

/**
 * 获取热门分类歌单接口返回数据类型
 */
export interface HotCateResponse extends Response {
  tags: tag[]
}
/**
 * 歌单分类信息
 */
export interface tag {
  playlistTag: {
    id: number
    name: string
    category: number
    usedCount: number
    position: number
    createTime: number
  }
  usedCount: number
  hot: true
  createTime: number
  name: string
  id: number
  type: number
}

/**
 * 获取分类歌单接口返回数据类型
 */
export interface CateSongsResponse extends Response {
  more: boolean
  lasttime: number
  total: number
  playlists: CateSonglist[]
}
/**
 * 分类歌单中的歌单信息
 */
export interface CateSonglist {
  name: string
  id: number
  trackNumberUpdateTime: number
  userId: number
  subscribedCount: number
  trackCount: 72
  cloudTrackCount: 0
  coverImgUrl: string
  description: string
  tags: string[]
  playCount: number
  trackUpdateTime: number
  specialType: 0
  totalDuration: 0
  creator: {
    followed: false
    avatarUrl: string
    userId: number
    nickname: string
    signature: string
    backgroundUrl: string
    expertTags: string[]
  }

  shareCount: number
  commentCount: number
  copywriter: string
  tag: string
}

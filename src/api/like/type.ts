import type { Response, song } from '../index/type'

/**
 * 喜欢音乐列表接口返回数据类型
 */
export interface LikeListResponse extends Response {
  ids: number[]
}

/**
 * 最近播放列表接口返回数据类型
 */
export interface RecentSongsResponse extends Response {
  data: {
    total: number
    list: ListItem[]
  }
}

/**
 * 最近歌曲项
 */
export interface ListItem {
  resourceId: string
  playTime: number
  resourceType: string
  data: song
}

/**
 * 云盘歌曲接口返回数据类型
 */
export interface CloudSongsResponse extends Response {
  count: number
  size: string
  maxSize: string
  upgradeSign: number
  hasMore: boolean
  data: CloudSong[]
}

/**
 * 云盘歌曲项
 */
export interface CloudSong {
  coverId: string
  lyricId: string
  album: string
  artist: string
  bitrate: number
  songId: number
  addTime: number
  songName: string
  cover: number
  version: number
  fileSize: number
  fileName: string
  simpleSong: song
}

/**
 * 最近视频列表接口返回数据类型
 */
export interface RecentVideosResponse extends Response {
  data: {
    total: number
    list: VideoItem[]
  }
}

/**
 * 最近视频项
 */
export interface VideoItem {
  resourceId: string
  playTime: number
  resourceType: string
  data: {
    id: string
    title: string
    coverUrl: string
    duration: number
    creator: {
      extProperties: {
        avatarImgId_str: string
      }
      defaultAvatar: boolean
      province: number
      authStatus: number
      followed: boolean
      avatarUrl: string
      accountStatus: number
      gender: number
      city: number
      birthday: number
      userId: number
      userType: number
      nickname: string
      signature: string
      description: string
      detailDescription: string
      avatarImgId: number
      backgroundImgId: number
      backgroundUrl: string
      authority: number
      mutual: boolean
      expertTags: null
      experts: {
        '1': string
      }
      djStatus: number
      vipType: number
      remarkName: null
      backgroundImgIdStr: string
      avatarImgIdStr: string
      xInfo: {
        avatarImgId_str: string
      }
    }
  }
  os: string
}

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

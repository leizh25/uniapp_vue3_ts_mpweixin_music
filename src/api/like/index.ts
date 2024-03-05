import { request } from '@/utils/request'
import type { LikeListResponse, RecentSongsResponse } from './type'

enum API {
  LISTLIST = '/likelist?uid=',
  RECENT_SONGS = '/record/recent/song',
}

//喜欢音乐列表接口
export const reqLikelist = (uid: string) => request<LikeListResponse>(API.LISTLIST + uid)

/**
 * 获取最近播放的歌曲接口
 * @returns
 */
export const reqRecentSongs = () => request<RecentSongsResponse>(API.RECENT_SONGS)

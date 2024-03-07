import { request } from '@/utils/request'
import type { CloudSongsResponse, LikeListResponse, RecentSongsResponse, RecentVideosResponse } from './type'

enum API {
  LISTLIST = '/likelist?uid=',
  RECENT_SONGS = '/record/recent/song',
  CLOUD_SONGS = '/user/cloud',
  RECENT_VIDEOS = '/record/recent/video',
}

//喜欢音乐列表接口
export const reqLikelist = (uid: string) => request<LikeListResponse>(API.LISTLIST + uid)

/**
 * 获取最近播放的歌曲接口
 * @returns
 */
export const reqRecentSongs = () => request<RecentSongsResponse>(API.RECENT_SONGS)

/**
 * 获取云盘歌曲的接口
 * @returns
 */
export const reqCloudSongs = () => request<CloudSongsResponse>(API.CLOUD_SONGS)

/**
 * 获取最近视频的接口
 * @returns
 */
export const reqRecentVideos = () => request<RecentVideosResponse>(API.RECENT_VIDEOS)

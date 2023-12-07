import { request } from '@/utils/request'
import type { SonglistDetailResponse } from './type'
enum API {
  PLAYLIST_DETAIL = '/playlist/detail',
}

/**
 * 获取歌单详情请求
 * @param id 歌单ID
 * @returns
 */
export const reqSonglistDetail = (id: string) => request<SonglistDetailResponse>(API.PLAYLIST_DETAIL, { id })

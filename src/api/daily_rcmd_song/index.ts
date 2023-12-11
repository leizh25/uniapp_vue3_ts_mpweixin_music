import { request } from '@/utils/request'
import type { RcmdSongsResponse } from './type'

enum API {
  RCMD_SONGS = '/recommend/songs', //获取每日推荐歌曲  需要登录
}
/**
 * 获取每日推荐歌曲
 * @returns
 */
export const reqRcmdSongs = () => request<RcmdSongsResponse>(API.RCMD_SONGS)

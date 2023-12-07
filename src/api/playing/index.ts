import { request } from '@/utils/request'
import type { LrcResponse, SongDetailResponse, SongUrlResponse } from './type'

enum API {
  SONG_DETAIL = '/song/detail', //歌曲详情
  SONG_URL = '/song/url/v1', //音乐播放地址
  LRC = '/lyric', //歌词
}

/**
 * 获取歌曲详情
 * @param ids 音乐ID,多个音乐ID用逗号隔开
 * @returns
 */
export const reqSongDetail = (ids: string) => request<SongDetailResponse>(API.SONG_DETAIL, { ids })

/**
 * 获取音乐播放地址
 * @param data 参数
 * @returns
 */
export const reqSongUrl = (id: number, level: string) => request<SongUrlResponse>(API.SONG_URL, { id, level })

export const reqLrc = (id: number) => request<LrcResponse>(API.LRC, { id })

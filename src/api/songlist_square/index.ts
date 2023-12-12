import { request } from '@/utils/request'
import type { CateSongsResponse, HotCateResponse } from './types'

enum API {
  HOT_CATE = '/playlist/hot',
  CATE_SONGS = '/top/playlist/highquality',
}

/**
 * 获取热门分类歌单
 * @returns
 */
export const reqHotCate = () => request<HotCateResponse>(API.HOT_CATE)

export const reqCateSongs = (obj: { cat: string; limit?: number; before?: number | string }) => request<CateSongsResponse>(API.CATE_SONGS, Object.assign(obj, { limit: 30 }))

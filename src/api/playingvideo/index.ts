import { request } from '@/utils/request'
import type { MvDetailResponse, MvPrimeInfoResponse, MvUrlResponse, SemiMvResponse } from './type'
enum API {
  MV_DETAIL = '/mv/detail',
  MV_URL = '/mv/url',
  SEMI_MV = '/simi/mv',
  MV_PRIME = '/mv/detail/info',
}
/**
 * 获取MV详情
 * @param mvid MVID
 * @returns
 */
export const reqMvDetail = (mvid: string) => request<MvDetailResponse>(API.MV_DETAIL, { mvid })

/**
 * 获取MV播放url
 * @param mvid mvid
 * @returns
 */
export const reqMvUrl = (id: string) => request<MvUrlResponse>(API.MV_URL, { id, r: 480 })

/**
 * 获取相似MV
 * @param mvid mvid
 * @returns
 */
export const reqSemiMv = (mvid: string) => request<SemiMvResponse>(API.SEMI_MV, { mvid })

/**
 * 获取mv评论转发点赞数据
 * @param mvid mvid
 * @returns
 */
export const reqMvPrimeInfo = (mvid: string) => request<MvPrimeInfoResponse>(API.MV_PRIME, { mvid })

import { request } from '@/utils/request'
import type { AllRankingsAbstractResponse, AllRankingsResponse } from './type'

enum API {
  ALL_RANKINGS = '/toplist',
  ALL_RANKINGSABSTRACT = '/toplist/detail',
}

/**
 * 获取所有榜单接口
 * @returns
 */
export const reqAllRankings = () => request<AllRankingsResponse>(API.ALL_RANKINGS)

/**
 * 所有榜单内容摘要接口
 * @returns
 */
export const reqAllRankingsAbstract = () => request<AllRankingsAbstractResponse>(API.ALL_RANKINGSABSTRACT)

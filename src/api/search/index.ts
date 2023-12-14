import { request } from '@/utils/request'
import type { HotSearchListResponse, SearchAdviceResponse, SearchDefaultResponse, SearchResponse } from './type'

enum API {
  'DEFAULT' = '/search/default',
  'ADVICE' = '/search/suggest',
  'HOT_LIST' = '/search/hot',
  'SEARCH' = '/search',
}

/**
 * 获取默认搜索关键词
 * @returns
 */
export const reqSeachDefault = () => request<SearchDefaultResponse>(API.DEFAULT)

/**
 * 获取搜索建议的接口
 * @param keywords 关键字
 * @returns
 */
export const reqSearchAdvice = (keywords: string) => request<SearchAdviceResponse>(API.ADVICE, { keywords })

/**
 * 获取简略热搜列表接口
 * @returns
 */
export const reqHotSearchList = () => request<HotSearchListResponse>(API.HOT_LIST)

/**
 * 搜索接口
 * @param keywords 关键字
 * @returns
 */
export const reqSearch = (keywords: string) => request<SearchResponse>(API.SEARCH, { keywords })

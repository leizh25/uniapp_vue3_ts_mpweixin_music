import { request } from '@/utils/request'
import type { HomepageResponse, BannerResponse } from './type'
enum API {
  // HOMEPAGE = 'http://127.0.0.1:3000/page', //首页数据
  // HOMEPAGE = 'http://192.168.123.62:3000/page', //首页数据
  HOMEPAGE = '/homepage/block/page', //首页数据
  BANNER = '/banner?type=2', //轮播图
}

/**
 * 请求首页数据接口
 * @returns
 */
export const reqHomepage = () => request<HomepageResponse>(API.HOMEPAGE)

export const reqBanner = () => request<BannerResponse>(API.BANNER)

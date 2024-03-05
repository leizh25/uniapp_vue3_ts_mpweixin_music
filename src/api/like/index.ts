import { request } from '@/utils/request'
import type { LikeListResponse } from './type'

enum API {
  LISTLIST = '/likelist?uid=',
}

//喜欢音乐列表接口
export const reqLikelist = (uid: string) => request<LikeListResponse>(API.LISTLIST + uid)

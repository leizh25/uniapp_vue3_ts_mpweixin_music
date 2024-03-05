import type { Response } from '../index/type'

/**
 * 喜欢音乐列表接口返回数据类型
 */
export interface LikeListResponse extends Response {
  ids: number[]
}

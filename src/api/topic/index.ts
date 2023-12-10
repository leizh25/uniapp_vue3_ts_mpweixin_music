import { request } from '@/utils/request'
import type { TopicCommentResponse, TopicDetailResponse } from './type'

enum API {
  TOPIC_DETAIL = '/topic/detail',
  TOPIC_Comment = '/topic/detail/event/hot',
}

/**
 * 获取话题详情
 * @param actid 话题ID
 * @returns 
 */
export const reqTopicDetail = (actid: number) => request<TopicDetailResponse>(API.TOPIC_DETAIL, { actid })

/**
 * 获取话题详情热门评论接口
 * @param actId 话题ID
 * @returns
 */
export const reqTopicComment = (actid: number) => request<TopicCommentResponse>(API.TOPIC_Comment, { actid })

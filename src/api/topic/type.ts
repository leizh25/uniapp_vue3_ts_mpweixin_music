interface Response {
  code: number
}

/**
 * 话题详情接口返回数据类型
 */
export interface TopicDetailResponse extends Response {
  act: act
}
export interface act {
  actId: number
  title: string
  startTime: number
  participateCount: number
  publishTip: string
  coverMobileUrl: string
}

/**
 * 话题评论接口返回数据类型
 */
export interface TopicCommentResponse extends Response {
  events: event[]
}
/**
 * 一条评论
 */
export interface event {
  actName: string
  forwardCount: number
  info: {
    commentThread: {
      resourceInfo: {
        id: number
        userId: number
        name: string
      }
      commentCount: number
      likedCount: number
      shareCount: number
      hotCount: number

      resourceTitle: string
      resourceId: number
      resourceOwnerId: number
    }
    liked: boolean
    resourceId: number
    likedCount: number
    shareCount: number
    commentCount: number
  }

  bottomActivityInfos: bottomActivityInfo[]

  user: {
    followed: boolean
    avatarUrl: string
    userId: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    backgroundUrl: string
    followeds: number
  }
  xInfo: {
    info: {
      commentThread: {
        resourceInfo: {
          id: number
          userId: number
          name: string
        }
        resourceType: number
        commentCount: number
        likedCount: number
        shareCount: number
        hotCount: number

        resourceTitle: string
        resourceId: number
        resourceOwnerId: number
        latestLikedUsers: latestLikedUser[]
      }
      liked: false
      comments: null
      resourceId: number
      likedCount: number
      shareCount: number
      commentCount: number
    }
  }
  actId: number
  showTime: number
  json: string
  eventTime: number
  pics: pic[]
  id: number
}
// 图片
interface pic {
  rectangleUrl: string
}
//最近点赞的用户
interface latestLikedUser {
  s: number
  t: number
}

interface bottomActivityInfo {
  id: string
  type: number
  subType: number
  name: string
  icon: null | string
  h5Target: string
}

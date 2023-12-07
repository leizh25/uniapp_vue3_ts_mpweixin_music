import type { privilege, song } from '../index/type'

interface Response {
  code: number
}

export interface SonglistDetailResponse extends Response {
  playlist?: Playlist
  privileges?: privilege[]
}

export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  createTime: number
  trackCount: number
  trackUpdateTime: number
  ordered: true
  description: string
  tags: string[]
  creator: {
    followed: false
    avatarUrl: string
    gender: number
    userId: number
    nickname: string
    signature: string
    description: string
    detailDescription: string
    backgroundUrl: string
    vipType: number
    remarkName: null
    avatarDetail: {
      identityIconUrl: string
    }
  }
  tracks: song[]
  playCount: number
  shareCount: number
  commentCount: number
  subscribedCount: number
  algTags: string[]
  trialMode: number
}

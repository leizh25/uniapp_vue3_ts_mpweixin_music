interface Response {
  code: number
}

/**
 * 获取所有榜单请求接口返回数据类型
 */
export interface AllRankingsResponse extends Response {
  list: Ranking[]
  artistToplist: {
    coverUrl: string
    name: string
    upateFrequency: string
    position: number
    updateFrequency: string
  }
}
/**
 * 单个榜单的信息
 */
export interface Ranking {
  updateFrequency: string
  subscribedCount: number
  trackCount: number
  coverImgUrl: string
  playCount: number
  createTime: number
  description: string
  name: string
  id: number
}

export interface AllRankingsAbstractResponse extends Response {
  list: RankingAbstract[]
}

export interface RankingAbstract {
  tracks: {
    first: string
    second: string
  }[]
  updateFrequency: string
  subscribedCount: number
  trackCount: number
  coverImgUrl: string
  playCount: number
  createTime: number
  description: string
  name: string
  id: number
}

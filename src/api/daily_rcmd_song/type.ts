interface Response {
  code: number
}

/**
 * 获取每日推荐歌曲接口返回数据类型
 */
export interface RcmdSongsResponse extends Response {
  data: {
    dailySongs: daily_song[]
  }
}

export interface daily_song {
  name: string
  id: number
  ar: [
    {
      id: number
      name: string
    },
  ]
  pop: number
  fee: number
  al: {
    id: number
    name: string
    picUrl: string
  }
  dt: number
  mark: number
  mv: number
  publishTime: number
  reason: string
  recommendReason: string
  privilege: {
    id: number
    fee: number
    payed: number
  }
}

interface Response {
  code: number
}

/**
 * 获取MV详情接口返回数据类型
 */
export interface MvDetailResponse extends Response {
  data: MvData
}
export interface MvData {
  id: number
  name: string
  artistId: number
  artistName: string
  briefDesc: string
  desc: null
  cover: string
  coverId_str: string
  coverId: number
  playCount: number
  subCount: number
  shareCount: number
  commentCount: number
  duration: number
  publishTime: string
  price: null
  brs: br[]
  artists: artist[]
  videoGroup: []
}

export interface br {
  size: number
  br: number
  point: number
}

export interface artist {
  id: number
  name: string
  img1v1Url: string
  followed: boolean
}
/**
 * 获取MV播放地址接口返回数据类型
 */
export interface MvUrlResponse extends Response {
  data: MvUrlData
}
export interface MvUrlData {
  id: number
  url: string
  r: number
  size: number
  md5: string
  code: number
  expi: number
  fee: number
  mvFee: number
  st: number
  promotionVo: null
  msg: string
}

/**
 * 获取相似MV接口返回数据类型
 */
export interface SemiMvResponse extends Response {
  mvs: mv[]
}

export interface mv {
  id: number
  cover: string
  name: string
  playCount: number
  briefDesc: string
  desc: string
  artistName: string
  artistId: number
  duration: number
  mark: number
  artists: artist[]
  alg: string
}

/**
 * MV点赞订阅分享数量接口返回数据类型
 */
export interface MvPrimeInfoResponse extends Response {
  likedCount: number
  shareCount: number
  commentCount: number
  liked: boolean
}

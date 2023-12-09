import type { song, privilege, fee } from '../index/type'
interface Response {
  code?: number
}
/**
 * 音乐详情接口返回数据类型
 */
export interface SongDetailResponse extends Response {
  songs?: song[]
  privileges?: privilege[]
}
/**
 * 歌曲播放地址接口返回数据类型
 */
export interface SongUrlResponse extends Response {
  data: [
    {
      id: number
      url: string
      size: number
      code: number
      expi: number
      type: string
      fee: fee
      payed: number
      flag: number
      freeTrialInfo: null
      level: string
      encodeType: string
      time: number
    },
  ]
}

export interface LrcResponse extends Response {
  lrc: {
    version: number
    lyric: string
  }
  klyric: {
    version: number
    lyric: string
  }
}

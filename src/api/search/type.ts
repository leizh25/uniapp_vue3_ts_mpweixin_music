interface Response {
  code: number
}

/**
 * 获取默认搜索关键词接口返回数据类型
 */
export interface SearchDefaultResponse extends Response {
  message: null | string
  data: {
    showKeyword: string
    styleKeyword: {
      keyWord: string
      descWord: string
    }
    realkeyword: string
    searchType: number
  }
}

/**
 * 获取搜索建议接口返回数据类型
 */
export interface SearchAdviceResponse extends Response {
  result: Advice
}
export interface Advice {
  albums?: album[]
  artists?: artist[]
  songs?: song[]
  order?: ['songs', 'artists', 'albums']
}

export interface album {
  id: number
  name: string
  artist: {
    id: number
    name: string
    picUrl: string
    img1v1Url: string
    transNames: string[]
    trans: string
  }
}

export interface song {
  id: number
  name: string
  artists: artist[]
  album: album
  duration: number
  fee: number
}

export interface artist {
  id: number
  name: string
  picUrl: string
  img1v1Url: string
  accountId: number
}

/**
 * 获取热搜(简略)列表接口返回数据类型
 */
export interface HotSearchListResponse extends Response {
  result: {
    hots: Hot[]
  }
}

export interface Hot {
  first: string
}

export interface SearchResponse extends Response {
  result: SearchResult
}

export interface SearchResult {
  songs?: song[]
  hasMore?: boolean
  songCount?: number
}
export interface song {
  id: number
  name: string
  artists: artist[]
  album: album
  duration: number
  alias: []
  mvid: number
  fee: number
}

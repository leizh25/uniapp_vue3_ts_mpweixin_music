interface Response {
  code: number
}
/**
 * 发送验证码接口返回类型定义
 */
export interface SentCaptchaResponse extends Response {
  data: boolean
  message?: string
}

/**
 * 验证验证码接口返回数据类型
 */
export interface VerifyCaptchaResponse extends Response {
  message?: string
  data?: boolean
  code: number
}

export interface LoginResponse extends Response {
  loginType: number
  message: string
  data: null
  account: {
    id: number
    userName: string
    type: number
    status: number
    whitelistAuthority: number
    createTime: number
    salt: string
    tokenVersion: number
    ban: number
    baoyueVersion: number
    donateVersion: number
    vipType: number
    viptypeVersion: number
    anonimousUser: false
    uninitialized: false
  }
  token: string
  profile: {
    followed: boolean
    vipType: number
    authStatus: number
    djStatus: number
    detailDescription: string
    experts: {}
    expertTags: null
    accountStatus: number
    nickname: string
    birthday: number
    gender: number
    province: number
    city: number
    avatarImgId: number
    backgroundImgId: number
    avatarUrl: string
    backgroundUrl: string
    userType: number
    defaultAvatar: boolean
    description: string
    userId: number
    signature: string
    followeds: number
    follows: number
    playlistCount: number
    playlistBeSubscribedCount: number
  }
  bindings: [
    {
      bindingTime: number
      refreshTime: number
      tokenJsonStr: string
      expiresIn: number
      url: string
      expired: boolean
      userId: number
      id: number
      type: number
    },
  ]
  cookie: string
}

import { request } from '@/utils/request'
import type { SentCaptchaResponse, VerifyCaptchaResponse, LoginResponse } from './type'
enum API {
  SENT_CAPTCHA = '/captcha/sent', //发送验证码
  VERIFY_CAPTCHA = '/captcha/verify', //验证验证码
  TEL_LOGIN = '/login/cellphone', //手机号登录
  PWD_LOGIN = '/login', //密码登录
}
/**
 * 发送验证码
 * @param phone 手机号
 * @returns
 */
export const reqSentCaptcha = (phone: string) => request<SentCaptchaResponse>(API.SENT_CAPTCHA, { phone })

/**
 * 验证验证码是否正确
 * @param phone 手机号
 * @param captcha 验证码
 * @returns
 */
export const reqVerifyCaptcha = (phone: number, captcha: number) => request<VerifyCaptchaResponse>(API.VERIFY_CAPTCHA, { phone, captcha })

/**
 * 登录
 * @param type 登录类型, 1:验证码登录，2:密码登录
 * @param data 登陆参数
 * @returns
 */
export const reqLogin = (type: 1 | 2, data: {}) => {
  if (type == 1) {
    // 手机号登录
    return request<LoginResponse>(API.TEL_LOGIN, data)
  } else if (type == 2) {
    // 账号密码   邮箱密码  登录
    return request<LoginResponse>(API.PWD_LOGIN, data)
  }
}

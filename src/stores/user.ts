import { defineStore } from 'pinia'
import { reqLogin } from '@/api/login'
import type { LoginResponse } from '@/api/login/type'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userinfo: uni.getStorageSync('userinfo') || {},
      account: {},
      token: '',
      profile: {},
      cookie: '',
      smsCode: '',
    }
  },
  actions: {
    async login(type: 1 | 2, data: any) {
      console.log(`执行类型${type}登录`)
      let res: LoginResponse
      //验证码登录, 密码登录
      if (type === 1) {
        res = (await reqLogin(1, data)) as LoginResponse
      }
      //邮箱登录
      if (type === 2) {
        console.log(data)
        res = (await reqLogin(2, data)) as LoginResponse
      }
      if (res.code === 200) {
        this.userinfo = res
        uni.setStorage({
          key: 'userinfo',
          data: res,
          success: async function () {
            console.log('userinfo存储成功')
            console.log('读取： ', uni.getStorageSync('userinfo'))
          },
        })
        return true
      } else {
        return Promise.reject(res.message || '错误')
      }
    },
  },
})

import { defineStore } from 'pinia'
import { request } from '@/utils/request'

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
    async login(type, data) {
      let res = ''
      console.log(`执行类型${type}登录`)
      //验证码登录, 密码登录
      if (type === 1) {
        res = await request({
          url: '/login/cellphone',
          data,
          method: 'get',
        })
      }
      //邮箱登录
      if (type === 2) {
        console.log(data)
        res = await request({
          url: '/login',
          data,
          method: 'post',
        })
      }
    //   console.log('res: ', res)
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
    // async getSmsCode(data) {
    //   const res = await request({
    //     url: '/captcha/sent',
    //     data,
    //     method: 'get',
    //   })
    //   if (res.code == 200) {
    //     return true
    //   } else {
    //     return Promise.reject(res.message)
    //   }
    // },
  },
})

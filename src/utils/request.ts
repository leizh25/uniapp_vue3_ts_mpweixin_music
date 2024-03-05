// const baseURL = 'http://azzz.fun:8163'
const baseURL = 'http://127.0.0.1:3000'
import { useUserStore } from '@/stores/user'
// let retryCount: number = 3
export const request = <T>(url: string, data?: any, method?: any, retryCount: number = 3): Promise<T> => {
  return new Promise((resolve, reject) => {
    uni.request({
      method: method || 'get',
      url: `${url.startsWith('http') ? url : baseURL + url}`,
      data: Object.assign({ cookie: useUserStore().userinfo.cookie || '' }, data),
      // header: {
      //   'Cache-Control': 'no-cache',
      // },
      success: (res) => {
        resolve(res.data as T)
      },
      fail: (err) => {
        // reject(err)
        console.error(`第 ${retryCount} 次请求失败，剩余重试次数 ${retryCount - 1}：`, err)
        if (retryCount <= 1) {
          // 重试次数已经用完，将错误信息返回给调用者
          reject(new Error('请求失败'))
        } else {
          // 还有重试次数，继续重试
          // retryCount--
          setTimeout(() => {
            console.log('url, data, method, retryCount - 1: ', url, data, method, retryCount - 1)
            request(url, data, method, retryCount - 1)
              // .then((res: any) => resolve(res.data))
              // .catch((e) => console.error('请求失败', e))
          }, 500)
        }
      },
    })
  })
}

const baseURL = 'http://azzz.fun:8163'
import { useUserStore } from '../stores/user'
export const request = (params) => {
  return new Promise((resolve, reject) => {
    // console.log(params.url);
    uni.request({
      method: params.method || 'get',
      url: `${params.url.startsWith('http') ? params.url : baseURL + params.url}`,
      data: params.data ? Object.assign({}, params.data, { cookie: useUserStore().userinfo.cookie || '' }) : { cookie: useUserStore().userinfo.cookie || '' },
      header: {
        'Content-type': 'application/json',
        // Cookie: useUserStore().userinfo.cookie || '',
        'Cache-Control': 'no-cache',
      },
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

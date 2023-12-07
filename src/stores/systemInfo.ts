// stores/counter.js
import { defineStore } from 'pinia'
import type { SystemInfoStore } from './type'

export const useSystemInfoStore = defineStore('systemInfo', {
  state: (): SystemInfoStore => {
    return {
      // 状态栏高度
      statusBarHeight: 0,
      // #ifdef MP-WEIXIN
      // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
      custom: {},
      // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
      navigationBarHeight: 0,
      // 总体高度 = 状态栏高度 + 导航栏高度
      navHeight: 0,
      //窗口高度
      windowHeight: 0,
      // 安全区域的边距
      safeAreaInsets: {},
      // 安全区域
      safeArea: {},
    }
  },
  actions: {
    init() {
      console.log('uni.getSystemInfoSync(): ', uni.getSystemInfoSync())
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
      this.custom = wx.getMenuButtonBoundingClientRect() || {}
      console.log('this.custom: ', this.custom)
      this.navigationBarHeight = this.custom.height! + (this.custom.top! - this.statusBarHeight) * 2
      this.navHeight = this.navigationBarHeight + this.statusBarHeight
      console.log('this.navHeight: ', this.navHeight)
      this.windowHeight = uni.getSystemInfoSync().windowHeight
      console.log('this.windowHeight: ', this.windowHeight)
      this.safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets
      this.safeArea = uni.getSystemInfoSync().safeArea
    },
  },
})

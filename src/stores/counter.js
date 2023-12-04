// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: uni.getStorageSync('count') || 0 }
  },
  actions: {
    increment() {
      this.count++
      uni.setStorage({
        key: 'count',
        data: this.count,
        success: async function () {
          console.log('count存储成功')
          console.log('读取： ', uni.getStorageSync('count'))
        },
      })
    },
  },
})

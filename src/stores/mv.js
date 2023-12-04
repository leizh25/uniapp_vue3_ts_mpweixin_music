import { defineStore } from 'pinia'

export const useMVStore = defineStore('MV', {
  state: () => {
    return {
      mvInfo: {},
      url: '',
      simiMVs: {},
      operationCounts: {},
      songId: '',
    }
  },
  actions: {},
})

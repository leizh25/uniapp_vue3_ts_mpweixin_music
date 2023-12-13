import { reqAllRankings, reqAllRankingsAbstract } from '@/api/rankings'
import type { AllRankingsAbstractResponse, AllRankingsResponse } from '@/api/rankings/type'
import { defineStore } from 'pinia'
import type { RankingsStore } from './type'

export const useRankingsStore = defineStore('rankings', {
  state: (): RankingsStore => {
    return {
      AllRankings: [],
      AllRankingsAbstract: [],
    }
  },
  actions: {
    async getAllRankings() {
      const res: AllRankingsResponse = await reqAllRankings()
      if (res.code == 200) {
        this.AllRankings = res.list
      }
    },
    async getAllRankingsAbstract() {
      const res: AllRankingsAbstractResponse = await reqAllRankingsAbstract()
      if (res.code == 200) {
        this.AllRankingsAbstract = res.list
      }
    },
  },
})

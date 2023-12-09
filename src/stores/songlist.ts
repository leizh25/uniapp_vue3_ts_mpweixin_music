import { defineStore } from 'pinia'
import type { SonglistStore } from './type'
import { reqSonglistDetail } from '@/api/songlist'
import type { SonglistDetailResponse } from '@/api/songlist/type'
import { useIndexDataStore } from './indexData'
const indexDataStore = useIndexDataStore()
export const useSonglistStore = defineStore('songlist', {
  state: (): SonglistStore => {
    return {
      playlist: {},
      songlistDetailRes: [],
      songlistIds: [],
    }
  },
  actions: {
    async getsonglistDetail(id: string) {
      const res: SonglistDetailResponse = await reqSonglistDetail(id)
      this.songlistDetailRes.push(res)
    },
    init() {
      indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.[0].resources?.forEach((item) => {
        this.songlistIds.push(item.resourceId)
      })
      indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.slice(1, 6).forEach((item) => {
        this.songlistIds.push(item.creativeId as string)
      })
      
    },
  },
})

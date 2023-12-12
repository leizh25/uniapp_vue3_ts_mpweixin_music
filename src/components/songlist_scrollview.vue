<template>
  <scroll-view class="scroll_view" :scroll-y="true" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="!!triggered" :style="{ height: height + 'px' }">
    <div class="songs_wrapper">
      <div class="song_box" v-for="item in playlists" :key="item.id" @click="goSonglist(item.id)">
        <div class="img_box">
          <img :src="item.coverImgUrl" class="img" lazy-load />
          <div class="play_count_box">
            <van-icon name="play" size="12" />
            <span class="text">{{ Math.floor(item.playCount / 10000) }}万</span>
          </div>
        </div>
        <div class="title_box">
          <span class="text van-multi-ellipsis--l2">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </scroll-view>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { reqCateSongs } from '@/api/songlist_square'
import type { CateSongsResponse, CateSonglist } from '@/api/songlist_square/types'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { useSonglistSquareStore } from '@/stores/songlist_square'
const songlistSquareStore = useSonglistSquareStore()
const triggered = ref<boolean | string>(false)
const isFreshing = ref<boolean>(false)
const cateSongsResponse = ref<CateSongsResponse>()
const playlists = ref<CateSonglist[]>([])
const props = defineProps<{
  height?: number
  cat: string
  index: number
}>()
onLoad(() => {
  isFreshing.value = false
})
const onRefresh = async () => {
  if (isFreshing.value) return
  triggered.value = true
  isFreshing.value = true
  await getData(true)
  triggered.value = false
  isFreshing.value = false
  console.log(' isFreshing.value: ', isFreshing.value)
}

onMounted(() => {
  // console.log(props.cat)
  if (props.index == 0) {
    getData()
  }
})
const getData = async (refresh?: boolean) => {
  try {
    const res: CateSongsResponse = await reqCateSongs({ cat: props.cat, before: refresh ? (cateSongsResponse.value?.lasttime as number) : "" })
    if (res.code == 200) {
      cateSongsResponse.value = res
      playlists.value = res.playlists
    } else {
      throw res
    }
  } catch (error) {
    Notify({ type: 'danger', message: '请求错误', top: useSystemInfoStore().statusBarHeight })
  }
}
watch(
  () => songlistSquareStore.activeTagIndex,
  (newVal) => {
    if (props.index == newVal && playlists.value.length === 0) {
      getData()
    }
  },
)
const goSonglist = (id: number) => {
  uni.navigateTo({
    url: '/pages/songList/songList?songListId=' + id,
  })
}
</script>
<style lang="less" scoped>
.scroll_view {
  width: 100%;
  // height: 100%;
  padding-bottom: 80px;
  box-sizing: border-box;
  // background-color: #bfa;
  .songs_wrapper {
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: space-between;
    // align-items: start;
    flex-wrap: wrap;
    // background-color: chocolate;
    padding: 10px 10px;
    box-sizing: border-box;
    .song_box {
      width: 107px;
      height: 150px;
      .img_box {
        width: 107px;
        height: 107px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        .img {
          width: 100%;
          height: 100%;
          background-color: burlywood;
        }
        .play_count_box {
          position: absolute;
          top: 5px;
          right: 5px;
          // width: 50px;
          padding: 0 10px;
          height: 15px;
          line-height: 15px;
          border-radius: 10px;
          // background-color: aqua;
          backdrop-filter: blur(50px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #fff;
          box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
          .text {
            // color: #eee;
          }
        }
      }
      .title_box {
        .text {
          font-size: 12px;
          letter-spacing: 0.1em;
        }
      }
    }
  }
}
</style>

<template>
  <div id="songlist_square">
    <!-- 标题栏 -->
    <van-nav-bar left-text="歌单广场" left-arrow @click-left="onClickLeft" />
    <!-- 歌单热门分类 滑动栏 -->
    <van-tabs class="tabs" :active="activeTagIndex" animated swipeable @change="changeTab">
      <van-tab v-for="(item, index) in tags" :key="item.id" :title="item.name" lazy-render>
        <songlist_scrollview :cat="item.name" :index="index" :height="systeminfoStore.windowHeight! - systeminfoStore.navHeight!"></songlist_scrollview>
      </van-tab>
    </van-tabs>

    <bottomMusicBar></bottomMusicBar>
    <van-notify id="van-notify" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHotCate } from '@/api/songlist_square'
import type { HotCateResponse, tag } from '@/api/songlist_square/types'
import bottomMusicBar from '@/components/bottom-music-bar.vue'
import { useSystemInfoStore } from '@/stores/systemInfo'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import songlist_scrollview from '@/components/songlist_scrollview.vue'
import { useSonglistSquareStore } from '@/stores/songlist_square'
const systeminfoStore = useSystemInfoStore()
const tags = ref<tag[]>([])
const activeTagIndex = ref<number>(0)
const onClickLeft = () => {
  uni.navigateBack()
}
onMounted(() => {
  getHotCate()
})
const getHotCate = async () => {
  try {
    const res: HotCateResponse = await reqHotCate()
    if (res.code == 200) {
      tags.value = res.tags
    } else {
      throw res
    }
  } catch (error: any) {
    console.log('error: ', error)
    Notify({ type: 'danger', message: '请求出错,请重试', top: systeminfoStore.statusBarHeight })
  }
}
const changeTab = (e: any) => {
  useSonglistSquareStore().activeTagIndex = e.detail.index
  console.log('useSonglistSquareStore().activeTagIndex: ', useSonglistSquareStore().activeTagIndex)
}
</script>

<style lang="less">
#songlist_square {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .tabs {
    .scroll_view {
      // width: 100%;
      // height: 100%;
      // background-color: #bfa;
    }
  }
}
</style>

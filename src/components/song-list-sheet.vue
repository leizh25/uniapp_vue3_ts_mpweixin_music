<template>
  <div>
    <van-action-sheet :show="playingStore.isShowSongListSheet" title="当前歌单" @close="close" @touchmove.stop>
      <scroll-view scroll-y="true">
        <van-swipe-cell right-width="65" left-width="65" v-for="i in 4" :key="i">
          <view slot="left" class="van-swipe-cell__left">选择</view>
          <van-cell-group>
            <van-cell title="单元格" value="内容" />
          </van-cell-group>
          <view slot="right" class="van-swipe-cell__right">删除</view>
        </van-swipe-cell>
      </scroll-view>
    </van-action-sheet>
  </div>
</template>
<script setup>
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
import { ref,  watch } from 'vue'
// const props = defineProps(['show'])
// const show = ref(false)
const close = () => {
  // 关闭面板
  playingStore.isShowSongListSheet = false
}

// watch(() => pl)
</script>
<style lang="less"></style>

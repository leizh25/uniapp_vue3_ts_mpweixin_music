<template>
  <div>
    <van-action-sheet :show="playingStore.isShowSongListSheet" title="当前播放列表" @close="close" @touchmove.stop>
      <scroll-view :scroll-y="true">
        <van-swipe-cell v-for="song in playingStore.playingSongList" :key="song.id">
          <!-- <div slot="left" class="van-swipe-cell__left">选择</div> -->
          <van-cell-group>
            <van-cell :title="`${song.name} - ${song.ar?.map(item=>item.name).join('、')}`" />
          </van-cell-group>
          <!-- <div class="songline">{{ song.name + " - " +song.ar?.map(item=>item.name).join('、')  }}</div> -->
          <!-- <div slot="right" class="van-swipe-cell__right">删除</div> -->
        </van-swipe-cell>
      </scroll-view>
    </van-action-sheet>
  </div>
</template>
<script setup lang="ts">
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

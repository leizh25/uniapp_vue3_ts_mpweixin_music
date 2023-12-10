<template>
  <div>
    <van-action-sheet :show="playingStore.isShowSongListSheet" title="当前播放列表" @close="close" @touchmove.stop>
      <scroll-view :scroll-y="true" class="scroll_view">
        <van-cell v-for="song in playingStore.playingSongList" :key="song.id" class="cell" hover-class="hover" @click="playsong(song)">
          <div slot="title" style="display: flex" class="title_wrapper">
            <img src="/static/img/zhengzaibofang.gif" class="img" v-if="playingStore.playingId == song.id" />
            <span class="text van-ellipsis">{{ song.name + ' - ' + song.ar?.map((item) => item.name).join('、') }}</span>
          </div>
          <van-icon slot="right-icon" name="cross" class="custom-icon" />
        </van-cell>
      </scroll-view>
    </van-action-sheet>
  </div>
</template>
<script setup lang="ts">
import type { song } from '@/api/index/type'
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
import { ref, watch } from 'vue'
// const props = defineProps(['show'])
// const show = ref(false)
const close = () => {
  // 关闭面板
  playingStore.isShowSongListSheet = false
}
const playsong = (song: song) => {
  playingStore.playNextSong(song.id?.toString())
}
// watch(() => pl)
</script>
<style lang="less">
.scroll_view {
  max-height: 30vh;
  .cell {
    &.hover {
      background-color: #bfa;
    }
    .title_wrapper {
      // background-color: #bfa;
      display: flex;
      align-content: center;
      .img {
        width: 20px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
}
</style>

<template>
  <div class="bottom_music_bar" :class="{ touch: touch ? 'touch' : '' }" @click="goPage1" @longtap="touchstart" @touchend="touchend">
    <div class="relative_box">
      <div class="disk_box">
        <van-circle class="circle" :value="playingStore.progressPercent" layer-color="#eeeeee" color="#ee0a24" size="41" />
        <img :src="playingStore.playingSongInfo.al.picUrl" class="img" v-if="playingStore.playingSongInfo.al?.img1v1Url" />
        <img src="/static/img/disk.png" class="img" v-else />
      </div>
      <div class="title">
        <span class="text">{{ playingStore.playingSongInfo.name ? playingStore.playingSongInfo.name + ' - ' + playingStore.playingSongInfo.ar?.map((item) => item.name).join('、') : '播放列表为空' }}</span>
      </div>
      <div class="prev_next_box">
        <img src="/static/img/bottom_music_bar/bofang.png" class="img" v-if="!playingStore.isPlaying" @click.stop="play" />
        <img src="/static/img/bottom_music_bar/zanting.png" class="img" v-else @click.stop="play" />
      </div>
      <div class="list_btn" @click.stop="showSongListSheet">
        <img src="/static/img/menu.png" class="img" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
// import { useSystemInfoStore } from '/stores/systeminfo.js'
// const SystemInfoStore = useSystemInfoStore()
const touch = ref(false)
const touchstart = () => {
  touch.value = true
}
const touchend = () => {
  touch.value = false
}
const goPage1 = () => {
  console.log('gopage')
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const play = () => {
  if (playingStore.isPlaying) {
    playingStore.pause()
  } else {
    playingStore.play()
  }
}
const showSongListSheet = () => {
  console.log(playingStore.isShowSongListSheet)
  playingStore.isShowSongListSheet = true
}
</script>
<style lang="less">
.bottom_music_bar {
  width: 100vw;
  height: 45px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transform: background-color 2s linear;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  &.touch {
    background-color: #bfa;
  }
  .relative_box {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    .disk_box {
      width: 50px;
      height: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      // background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      // position: relative;
      .circle {
        position: absolute;
        left: 9px;
        bottom: -1px;
        // position: absolute;
        // left: 9px;
        // bottom: -1px;
      }
      .img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
    .title {
      width: 230px;
      font-size: 14px;
      color: #333;
      display: flex;
      align-items: center;
      padding-left: 5px;
      box-sizing: border-box;

      .text {
        width: 100%;
        letter-spacing: 0.1em;
        overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
        white-space: nowrap; //（设置文字在一行显示，不能换行）
        text-overflow: ellipsis; //（规定当文本溢出时，显示省略符号来代表被修剪的文本）
      }
    }
    .prev_next_box,
    .list_btn {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 50%;
        height: 50%;
      }
    }
  }
}
</style>

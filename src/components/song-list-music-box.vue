<template>
  <div class="song_box" :class="{ active: isActive }" @touch="goPlay(music)" @longpress="active(true)" @touchend="active(false)">
    <div class="index_box">
      <van-icon name="volume-o" size="20" v-if="false" />
      <div class="text" v-else>{{ n }}</div>
    </div>
    <div class="song_info_box">
      <div class="song_name van-ellipsis">{{ music.name }}</div>
      <div class="song_album">
        <van-icon name="vip-card-o" size="17" class="icon" color="#f00" v-if="music.fee == 1" />
        <div class="song_info">{{ music.ar.map((item) => item.name).join('、') }}-{{ music.al.name }}</div>
      </div>
    </div>
    <div class="video_btn_box" v-if="music.mv" @click="goVideo(music.mv, music.id)">
      <img src="/static/img/shipingbofang.png" class="img" />
    </div>
    <div class="menu_btn_box">
      <div class="icon_box">
        <van-icon class="icon" name="ellipsis" size="20" />
      </div>
    </div>
  </div>
</template>
<script setup>
import {  onMounted, ref } from 'vue'
import { usePlayingStore } from '@/stores/playing.js'
const playingStore = usePlayingStore()
const props = defineProps(['music', 'n'])
const isActive = ref(false)

onMounted(() => {
  // console.log('props.music: ', props.music)
})
const active = (flag) => {
  if (flag) isActive.value = true
  else isActive.value = false
}
const goVideo = (mvid, songid) => {
  uni.navigateTo({
    url: `/pages/playingvideo/playingvideo?mvid=${mvid}&songId=${songid}`,
  })
}
const goPlay = (music) => {
  playingStore.singing = music
  uni.navigateTo({
    url: `/pages/playing/playing`,
  })
}
</script>
<style lang="less">
.song_box {
  height: 55px;
  display: flex;
  border-bottom: 0.1px solid rgba(100, 100, 100, 0.1);
  &.active {
    background-color: #bfa;
  }
  .index_box {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song_info_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 200px;
    flex: 1;
    .song_name {
      font-size: 15px;
      &.active {
        color: #f00;
      }
    }
    .song_album {
      margin-top: 1px;
      display: flex;
      .icon {
        margin-right: 2px;
      }
      .song_info {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .video_btn_box {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .img {
      width: 35px;
      height: 35px;
      opacity: 0.6;
    }
  }
  .menu_btn_box {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon_box {
      width: 35px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      .icon {
        transform: rotateZ(90deg);
      }
    }
  }
}
</style>

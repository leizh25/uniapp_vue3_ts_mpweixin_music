<template>
  <div class="long_music_box" @click="goPage(1, music)" :class="{ touch: isTouching }" @longtap="isTouching = true" @touchend="isTouching = false">
    <img :src="music.imageUrl" class="img" lazy-load="true"/>
    <div class="desc_box">
      <div class="desc" :style="{ width: music.mvid ? '212px' : '242px' }">
        <div class="singer" v-if="music.singer">{{ music.singer }}</div>
        <div class="name">{{ music.songName }}</div>
        <div class="bottom">
          <div class="tag" v-if="music.subTitle">
            <span class="text">{{ music.subTitle }}</span>
          </div>
          <text class="author">{{ music.songAr.map((item) => item.name).join('、') }}</text>
        </div>
      </div>
    </div>
    <div class="play_box" v-if="music.mvid" @click.stop="goPage(2, music)">
      <img src="/static/img/shipingbofang.png" class="img" />
    </div>
  </div>
</template>
<script setup>
import { onMounted,  ref } from 'vue'
import { usePlayingStore } from '@/stores/playing.js'
const playingStore = usePlayingStore()
const props = defineProps(['music'])
const isTouching = ref(false)
const goPage = (n, music) => {
  console.log('music: ', music)
  if (n === 1) {
    console.log('跳转音乐')
    uni.navigateTo({
      url: '/pages/playing/playing',
    })
    playingStore.singing = music
  } else if (n === 2) {
    console.log('跳转视频')
    uni.navigateTo({
      url: `/pages/playingvideo/playingvideo?mvid=${music.mvid}&songId=${music.resourceId}`,
    })
  }
}
</script>
<style lang="less">
.long_music_box {
  height: 55px;
  // background-color: #bfa;
  display: flex;
  margin-bottom: 10px;
  margin-left: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  &.touch {
    background-color: #bfa;
  }
  .img {
    width: 55px;
    height: 55px;
    border-radius: 10px;
    // background-color: chartreuse;
  }
  .desc_box {
    // flex: 1;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .desc {
      margin-left: 8px;
      // width: 180px;
      .name {
        // font-weight: bold;
        font-size: 16px;
        // font-weight: lighter;
        // background-color: #fff;
        width: 100%; //（限制最大宽度）
        overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
        white-space: nowrap; //（设置文字在一行显示，不能换行）
        text-overflow: ellipsis; //（规定当文本溢出时，显示省略符号来代表被修剪的文本）
      }
      .bottom {
        display: flex;
        margin-top: 4px;
        font-size: 11px;
        .author {
          // font-weight: lighter;
          color: #333;
          // background-color: #fff;
          // width: ; //??rpx;（限制最大宽度）
          overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
          white-space: nowrap; //（设置文字在一行显示，不能换行）
          text-overflow: ellipsis; //（规定当文本溢出时，显示省略符号来代表被修剪的文本）
        }
        .tag {
          height: 10px;
          white-space: nowrap; //（设置文字在一行显示，不能换行）
          box-sizing: border-box;
          // border: 1px solid #f00;
          margin-right: 5px;
          .text {
            border-radius: 5px;
            padding: 0 5px;
            background-color: rgba(255, 0, 0, 0.084);
            font-size: 10px;
            color: #f00;
            line-height: 10px;
          }
        }
      }
    }
  }
  .play_box {
    width: 30px;
    height: 100%;
    margin-right: 10px;
    // background-image: url("/static/img/shipingbofang.png");
    // background-size: contain;
    // background-repeat: no-repeat;
    // background-color: #343;
    // position: absolute;
    // right: 5px;
    // top: 0;
    display: flex;
    align-items: center;
    .img {
      width: 30px;
      height: 30px;
      opacity: 0.2;
    }
  }
}
</style>

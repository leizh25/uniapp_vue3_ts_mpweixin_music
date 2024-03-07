<template>
  <div id="recent_video">
    <van-nav-bar title="最近播放的视频" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="recent_box" hover-class="hover" v-for="item in videos" :key="item.resourceId" @click="goPlayVideo(item)">
      <div class="img_box">
        <img :src="item.data.coverUrl" alt="" class="img" />
      </div>
      <div class="right">
        <div class="title van-multi-ellipsis--l2">{{ item.data.title }}</div>
        <div class="author van-ellipsis">作者:{{ item.data.creator.nickname }}</div>
        <!-- <div class="time van-ellipsis">时间:{{ item.playTime }}</div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reqRecentVideos } from '@/api/like'
import type { VideoItem, RecentVideosResponse } from '@/api/like/type'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const videos = ref<VideoItem[]>([])
const onClickLeft = () => {
  uni.navigateBack()
}
onLoad(() => {
  getData()
})
const getData = async () => {
  const res: RecentVideosResponse = await reqRecentVideos()
  if (res.code === 200) {
    videos.value = res.data.list
  }
}
const goPlayVideo = (item: VideoItem) => {
  uni.navigateTo({
    url: `/pages/playingvideo/playingvideo?mvid=${item.data.id}`,
  })
}
</script>
<style lang="less">
.hover {
  background-color: #eee !important;
}
#recent_video {
  width: 100vw;
  height: 100vh;
  padding: 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  .recent_box {
    width: 100%;
    height: 200rpx;
    background-color: rgb(243, 243, 220);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10rpx;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20rpx;
    .img_box {
      width: 250rpx;
      height: 180rpx;
      // background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: calc(100% - 250rpx - 20rpx);
      height: 180rpx;
      // background-color: #f00;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .author {
        font-size: 14px;
      }
      .time {
        font-size: 12px;
      }
    }
  }
}
</style>

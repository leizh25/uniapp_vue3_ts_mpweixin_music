<template>
  <div class="rect_music_box" @click="goPage(songList.resourceId)">
    <!-- <img :src="songList.imageUrl" class="img" lazy-load="true" /> -->
    <van-image use-loading-slot :src="songList.imageUrl" class="img" lazy-load width="100%" height="100%">
      <van-loading slot="loading" type="spinner" size="20" vertical />
    </van-image>

    <!-- <mina-lazy-image :src="songList.imageUrl" class="img" /> -->
    <text class="text">{{ songList.title }}</text>
    <div class="count_box" v-if="!showSlot">
      <van-icon name="play" style="transform: translateX(3px)" />
      {{ parseInt(songList.playCount / 10000) + '万' }}
    </div>
    <div class="slot" v-else>
      <view class="van-multi-ellipsis--l2">
        <slot></slot>
      </view>
    </div>
  </div>
</template>
<script setup>
import {  onMounted } from 'vue'
const props = defineProps(['songList', 'showSlot', 'to'])
onMounted(() => {
  // console.log('props.songList: ', props.songList)
})
const goPage = (resourceId) => {
  if (props.to === 'songlist') {
    uni.navigateTo({
      url: '/pages/songList/songList?songListId=' + resourceId,
    })
  } else if (props.to === 'manyousonglist') {
    uni.navigateTo({
      url: '/pages/manyousonglist/manyousonglist?songListId=' + resourceId,
    })
  }
}
</script>
<style lang="less" scoped>
.rect_music_box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;

  .img {
    width: 100%;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    background-color: brown;
  }

  .text {
    width: 110px;
    height: 35px;
    flex: 1;
    font-size: 12px;
    // font-weight: lighter;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-line-clamp: 2; //显⽰的⾏数
    overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
    text-overflow: ellipsis;
  }

  .count_box {
    position: absolute;
    top: 5px;
    right: 8px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    font-style: italic;
  }
  .slot {
    position: absolute;
    top: 5px;
    right: 8px;
  }
}
</style>

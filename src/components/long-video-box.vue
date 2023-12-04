<template>
  <div class="video_box" hover-class="hover" @click="refresh">
    <img :src="mv.cover" class="img" lazy-load="true"/>
    <div class="right">
      <div class="title">{{ mv.name }}</div>
      <div class="info">
        <div class="author">{{ mv.artistName }}</div>
        <div class="count_box">
          <div class="count">{{ parseInt(mv.playCount / 10000) }}万播放</div>
          <!-- <div class="count">2023-12-01</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['mv'])
const refresh = () => {
  uni.redirectTo({
    url: '/pages/playingvideo/playingvideo?mvid=' + props.mv.id,
  })
}
</script>
<style lang="less">
.video_box {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  //   background-color: crimson;
  display: flex;
  &:hover {
    background-color: bisque;
  }
  //   justify-content: space-between;
  .img {
    width: 150px;
    height: 100%;
    border-radius: 10px;
    margin-right: 10px;
    background-color: cornflowerblue;
  }
  .right {
    // width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 15px;
    }
    .info {
      color: #666;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      .count_box {
        margin-top: 1px;
        display: flex;
        .count {
          margin-right: 6px;
        }
      }
    }
  }
}
</style>

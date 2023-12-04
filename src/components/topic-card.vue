<template>
  <div class="scroll_item" :style="{ backgroundImage: `url(${topic.backgroundUrl})` }">
    <div class="bg">
      <div class="inner_box">
        <div class="left">
          <div class="title_wrapper">
            <div class="title">{{ topic?.mainTitle }}</div>
            <div class="hot">{{ topic?.subTitle }}</div>
          </div>
          <text class="desc">{{ topic?.eventMsg }}</text>
        </div>
        <div class="img_box">
          <img :src="topic?.imageUrl" class="img" lazy-load="true"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {  onMounted } from 'vue'
const props = defineProps(['topic'])
onMounted(() => {
  // console.log(props.topic)
})
</script>
<style lang="less" scoped>
.scroll_item {
  display: inline-block;
  width: 250px;
  height: 105px;
  // background-color: coral;
  margin-right: 10px;
  border-radius: 10px;
  // backdrop-filter: blur(30px);
  overflow: hidden;
  background: linear-gradient(to bottom, #7f7aa1, #9593ba);

  .bg {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(40px);
    padding: 12px;
    box-sizing: border-box;

    .inner_box {
      float: left;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex-direction: column;
        justify-content: space-between;

        .title_wrapper {
          height: 35px;
          .title {
            font-weight: bold;
            color: #fff;
            font-size: 13px;
          }
          .hot {
            margin-top: 2px;
            font-size: 10px;
            color: #ddd;
          }
        }
        .desc {
          display: block;
          width: 175px;
          height: 30px;
          margin-top: 10px;
          padding-right: 5px;
          box-sizing: border-box;
          font-size: 11px;
          line-height: 15px;
          letter-spacing: 0.12em;
          color: #ddd;
          overflow: hidden;
          word-wrap: break-word;
          white-space: pre-wrap; //（设置文字在一行显示，不能换行）
        }
      }
    }
    .img_box {
      display: flex;
      align-items: center;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #bfa;
      }
    }
  }
}
</style>

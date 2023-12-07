<template>
  <div class="scroll_item" :style="{ backgroundImage: `url(${topic.uiElement.image.imageUrl})` }">
    <div class="bg">
      <div class="inner_box">
        <div class="left">
          <div class="title_wrapper">
            <div class="title_box">
              <img :src="topic.uiElement.mainTitle.titleImgUrl" class="img" />
              <div class="title">{{ topic.uiElement.mainTitle.title }}</div>
            </div>
            <div class="hot">{{ topic.uiElement.subTitle.title }}</div>
          </div>
          <span class="desc">{{ topic.resourceExtInfo.eventMsg }}</span>
        </div>
        <div class="img_box">
          <img :src="topic.uiElement.image.imageUrl" class="img" lazy-load="true" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { resource6_1 } from '@/api/index/type'
import { onMounted } from 'vue'
const props = defineProps<{
  topic: resource6_1
}>()
onMounted(() => {
  // console.log(props.topic)
})
</script>
<style lang="less">
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
        mix-blend-mode: difference;
        filter: invert(1) grayscale(1) contrast(2);
        color: #eee;

        .title_wrapper {
          height: 35px;
          .title_box {
            display: flex;

            .img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
            .title {
              font-weight: bold;
              color: #fff;
              font-size: 13px;
            }
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

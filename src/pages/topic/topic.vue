<template>
  <div id="topic" :style="{ backgroundImage: `url(${topicDetail?.coverMobileUrl})` }">
    <!-- 标题栏 -->
    <div class="title_wrapper" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px', height: systemInfoStore.navigationBarHeight + 'px' }">
      <van-icon name="arrow-left" size="20" class="back_btn" @click="goBack" />
      <div class="title_box">
        <div class="title">{{ topicDetail?.title }}</div>
        <div class="attain_count">{{ topicDetail?.participateCount }}万人参与</div>
      </div>
      <span class="zhanwei">　　</span>
    </div>
    <scroll-view id="scroll_view" :scroll-y="true" @scroll="onScroll" :style="{height:systemInfoStore.windowHeight! + 'px'}">
      <!-- 描述栏 -->
      <div class="desc_wrapper">
        <span class="text van-multi-ellipsis--l2">{{ topicDetail?.publishTip }}</span>
      </div>
      <!-- 提示栏 固钉 -->
      <van-sticky :scroll-top="scrollTop" :offset-top="offsetTop">
        <div class="tip_wrapper">
          <span class="left_text">全部</span>
          <div class="sort">
            <span class="text active">推荐</span>
            <span class="text">最新</span>
          </div>
        </div>
      </van-sticky>
      <!-- 话题内容 -->
      <topic_content_box v-for="(comment, index) in topicComment" :key="index" :comment="comment"></topic_content_box>
    </scroll-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { onLoad } from '@dcloudio/uni-app'
import topic_content_box from '@/components/topic_content_box.vue'
import { reqTopicDetail, reqTopicComment } from '@/api/topic'
import type { TopicDetailResponse, TopicCommentResponse, event, act } from '@/api/topic/type'
const systemInfoStore = useSystemInfoStore()
const scrollTop = ref<number>(0)
const offsetTop = ref<number>(0)
const actId = ref<number>(0)
const topicDetail = ref<act>()
const topicComment = ref<event[]>([])
onLoad((e: any) => {
  actId.value = e.actId
  getTopicDetail()
  getTopicComment()
})

//获取话题详情
const getTopicDetail = async () => {
  const res: TopicDetailResponse = await reqTopicDetail(actId.value as number)
  topicDetail.value = res.act
}
//获取话题热门评论
const getTopicComment = async () => {
  const res: TopicCommentResponse = await reqTopicComment(actId.value as number)
  topicComment.value = res.events
}

//返回按钮
const goBack = () => {
  uni.navigateBack()
}
//随着滚动条组件滚动,动态设置固钉位置
const onScroll = (e: any) => {
  wx.createSelectorQuery()
    .select('#scroll_view')
    .boundingClientRect((res) => {
      scrollTop.value = e.detail.scrollTop
      offsetTop.value = res.top
    })
    .exec()
}
</script>

<style lang="less">
#topic {
  width: 100vw;
  height: 100vh;
  background-size: 100% 100px;
  background-repeat: no-repeat;
  // 标题栏
  .title_wrapper {
    // background-color: #bfa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(30px);
    .back_btn {
      padding-left: 10px;
    }
    .title_box {
      height: 100%;
      // background-color: pink;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .title {
        font-weight: bold;
      }
      .attain_count {
        font-size: 11px;
        color: #999;
        mix-blend-mode: difference;
        filter: invert(1) grayscale(1) contrast(2);
      }
    }
  }
  #scroll_view {
    // background-color: pink;
    box-sizing: border-box;
    background-color: #fff;
    // 描述栏
    .desc_wrapper {
      max-height: 60px;
      background-color: #fff;
      color: #666;
      font-size: 14px;
      box-sizing: border-box;
      letter-spacing: 0.1em;
      padding: 0 10px;
      padding-top: 10px;
      // mix-blend-mode: difference;
      // backdrop-filter: blur(30px);
      // filter: invert(1) grayscale(1) contrast(2);
    }
    // 提示栏 固钉
    .tip_wrapper {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      // background-color: rgb(215, 134, 29);
      // backdrop-filter: blur(30px);
      background-color: #fff;
      .left_text {
        font-size: 14px;
        font-weight: 600;
      }
      .sort {
        width: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #666;
        .text.active {
          color: #000;
        }
      }
    }
  }
}
</style>

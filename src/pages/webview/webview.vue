<template>
  <view>
    <web-view :src="url" @error="onError"></web-view>
    <!-- 顶部通知 -->
    <van-notify id="van-notify" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import { onLoad } from '@dcloudio/uni-app'
const url = ref('')
onLoad((e) => {
  // console.log(e)
  url.value = e.url
})
const onError = (event) => {
  //   console.log(event.detail)
  Notify({
    message: 'webview加载失败,请重试',
    type: 'danger',
    // top: systemInfoStore.statusBarHeight,
  })
}
</script>

<style lang="less"></style>

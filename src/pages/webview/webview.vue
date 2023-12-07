<template>
  <div>
    <web-view :src="url" @error="onError"></web-view>
    <!-- 顶部通知 -->
    <van-notify id="van-notify" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import { onLoad } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo'
const systemInfoStore = useSystemInfoStore()
const url = ref('')
onLoad((e: any) => {
  // console.log(e)
  url.value = e.url
})
const onError = (event: any) => {
  //   console.log(event.detail)
  Notify({
    message: 'webview加载失败,请重试',
    type: 'danger',
    top: systemInfoStore.statusBarHeight,
  })
}
</script>

<style lang="less"></style>

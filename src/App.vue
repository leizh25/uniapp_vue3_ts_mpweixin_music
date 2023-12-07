<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { usePlayingStore } from '@/stores/playing'

onLaunch(async () => {
  console.log('App Launch')
  await useSystemInfoStore().init()
  await usePlayingStore().init()
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/*每个页面公共css */
@import '@/wxcomponents/@vant/weapp/common/index.wxss';
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
}
</style>

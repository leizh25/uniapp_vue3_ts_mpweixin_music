<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo.js'
import { useIndexDataStore } from '@/stores/indexData.js'
import { usePlayingStore } from '@/stores/playing.js'

onLaunch(async () => {
  console.log('App Launch')
  await useSystemInfoStore().init()
  await useIndexDataStore().init()
  await usePlayingStore().init()
  const indexDataStore = useIndexDataStore()
  //   console.log('useIndexDataStore(): ', useIndexDataStore())
  for (const key in indexDataStore) {
    if (Object.hasOwnProperty.call(indexDataStore, key)) {
      const element = indexDataStore[key]
      if (key.startsWith('HOMEPAGE') && JSON.stringify(element) !== '{}') {
        console.log(key, indexDataStore[key])
      }
    }
  }
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

<template>
  <div id="ranking_list" :style="{ paddingTop: useSystemInfoStore().navHeight + 'px' }">
    <van-nav-bar title="全部榜单" fixed left-arrow @click-left="goBack" />
    <van-index-bar>
      <van-cell hover-class="active" is-link center link-type="navigateTo" v-for="item in useRankingsStore().AllRankingsAbstract" :key="item.id" :url="`/pages/rankingsongs/rankingsongs?id=${item.id}`">
        <div slot="title" style="display: flex; align-items: center">
          <img :src="item.coverImgUrl" lazy-load class="img" style="width: 40px; height: 40px; margin-right: 10px; background-color: #bfa; border-radius: 10px" />
          <div class="van-cell-text">{{ item.name }}</div>
        </div>
      </van-cell>
    </van-index-bar>
  </div>
</template>

<script setup lang="ts">
import { useRankingsStore } from '@/stores/rankings'
import { useSystemInfoStore } from '@/stores/systemInfo'

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="less">
#ranking_list {
  box-sizing: border-box;
  .active{
    background-color: #bfa;
  }
}
</style>

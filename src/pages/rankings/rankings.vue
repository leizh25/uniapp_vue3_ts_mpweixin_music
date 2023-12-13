<template>
  <div id="rankings">
    <van-nav-bar title="排行榜" fixed left-arrow @click-left="goBack" />
    <!-- <van-tabs animated>
      <van-tab v-for="item in rankingsStore.AllRankings.slice(0,4)" :title="item.name"></van-tab>
    </van-tabs> -->

    <div class="rankings_wrapper" :style="{ paddingTop: useSystemInfoStore().navHeight + 'px' }">
      <div class="ranking_box" v-for="item in rankingsStore.AllRankingsAbstract.filter((i) => i.tracks.length != 0)" :key="item.id" @click="goRankingsongs(item.id)">
        <div class="ranking_title_box">
          <span class="title">{{ item.name }}</span>
          <div class="frequence">{{ item.updateFrequency }}</div>
        </div>
        <div class="ranking_info_box">
          <div class="img_box">
            <img :src="item.coverImgUrl" class="img" lazy-load />
          </div>
          <div class="songs_box">
            <div class="song_box" v-for="(song, index) in item.tracks" :key="index">
              <div class="index">{{ index }}</div>
              <div class="song_info van-ellipsis">
                <div class="name van-ellipsis">{{ song.first }}</div>
                <div>&nbsp;-&nbsp;</div>
                <div class="artist van-ellipsis">{{ song.second }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tip" hover-class="active" @click="goRankingList">
        <span>查看更多榜单</span>
        <span>></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import { useRankingsStore } from '@/stores/rankings'
import { useSystemInfoStore } from '@/stores/systemInfo'
const rankingsStore = useRankingsStore()
const goBack = () => {
  uni.navigateBack()
}
onLoad(() => {
  // rankingsStore.getAllRankings()
  rankingsStore.getAllRankingsAbstract()
})
onMounted(() => {})

const goRankingsongs = (id: number) => {
  uni.navigateTo({
    url: '/pages/rankingsongs/rankingsongs?id=' + id,
  })
}

const goRankingList = () => {
  uni.navigateTo({
    url: '/pages/rankinglist/rankinglist',
  })
}
</script>

<style lang="less">
#rankings {
  width: 100vw;
  .rankings_wrapper {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .ranking_box {
    width: 100%;
    height: 130px;
    margin: 10px 0;
    padding: 0 15px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    .ranking_title_box {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background-color: aquamarine;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .frequence {
        color: #999;
        font-size: 11px;
      }
    }
    .ranking_info_box {
      display: flex;

      .img_box {
        width: 80px;
        height: 64px;
        // background-color: brown;
        .img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background-color: aqua;
        }
      }
      .songs_box {
        flex: 1;
        padding-right: 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .song_box {
          width: 100%;
          display: flex;
          font-weight: bold;
          font-size: 13px;
          overflow: hidden;
          .index {
            padding: 0 10px;
          }
          .song_info {
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            .artist {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
  .tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    &.active {
      background-color: #bfa;
    }
  }
}
</style>

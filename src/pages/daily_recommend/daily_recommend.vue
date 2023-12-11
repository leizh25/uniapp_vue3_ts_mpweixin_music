<template>
  <div id="daily_rcmd">
    <!-- 标题栏 -->
    <div class="title_wrapper" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px', height: systemInfoStore.navigationBarHeight + 'px', backgroundColor: `rgba(255,255,255,${titleOpacity})` }">
      <van-icon name="arrow-left" size="20" />
      <div class="title" :style="{ width: systemInfoStore.custom?.width + 'px', height: systemInfoStore.custom?.height + 'px' }"><span class="text">每日推荐</span></div>
      <div class="zhanwei">　　</div>
    </div>
    <scroll-view id="scroller" class="scroll_view" :scroll-y="true" @scroll="onScroll" :style="{ height: systemInfoStore.safeArea?.height!+ systemInfoStore.navHeight! + 'px' }">
      <!-- 日期栏 -->
      <div class="date_wrapper" :style="{ height: systemInfoStore.navHeight! + 155 + 'px',backgroundImage:`url(https://uapis.cn/api/bing.php)` }">
        <div class="date_box">
          <div class="date">
            <span class="day">{{ new Date().getDate() }}</span>
            <span class="line">/</span>
            <span class="month">{{ new Date().getMonth() + 1 }}</span>
          </div>
          <div class="ofrtune_box">查看今日运运势></div>
        </div>
      </div>
      <!-- 播放栏 -->
      <van-sticky :scroll-top="scrollTop" :offset-top="offsetTop + systemInfoStore.navHeight!">
        <div class="play_all">
          <div class="left">
            <van-icon name="play-circle" size="25" color="#FD3126" />
            <span class="text">播放全部</span>
          </div>
        </div>
      </van-sticky>

      <!-- 歌曲 -->
      <div class="song_wrapper" v-for="item in dailySongs" :key="item.id">
        <div class="left" :style="{ width: `calc(100% - ${item.mv ? '70px' : '35px'})` }" @click="playSong(item.id)">
          <div class="img_box">
            <img :src="item.al.picUrl" class="img" lazy-load />
          </div>
          <div class="song_box" :style="{ width: `calc(100% - ${item.mv ? '70px' : '35px'} - 40px)` }">
            <div class="name van-ellipsis">{{ item.name }}</div>
            <div class="album_box">
              <div class="tag" v-if="!!item.reason">{{ item.reason }}</div>
              <div class="al_name van-ellipsis">{{ item.ar.map((i) => i.name).join('、') + ' - ' + item.al.name }}</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="btn video_btn" v-if="item.mv" @click="playVideo(item)">
            <van-icon name="video-o" size="25" />
          </div>
          <div class="btn menu_btn" @click="openMenu">
            <van-icon name="ellipsis" size="25" style="rotate: 90deg" />
          </div>
        </div>
      </div>
    </scroll-view>
    <van-notify id="van-notify" />
    <van-action-sheet :show="showActionSheet" title="标题" @close="closeActionSheet">
      <div>内容</div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RcmdSongsResponse, daily_song } from '@/api/daily_rcmd_song/type'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { onLoad } from '@dcloudio/uni-app'
import { reqRcmdSongs } from '@/api/daily_rcmd_song'
import { usePlayingStore } from '@/stores/playing'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import debounce from '@/utils/debounce'
const playingStore = usePlayingStore()
const systemInfoStore = useSystemInfoStore()
const dailySongs = ref<daily_song[]>([])
const scrollTop = ref<number>(0)
const offsetTop = ref<number>(0)
const titleOpacity = ref<number>(0)
const showActionSheet = ref<boolean>(false)
onLoad(async () => {
  const res: RcmdSongsResponse = await reqRcmdSongs()
  if (res.code == 302) {
    await uni.navigateTo({
      url: '/pages/login/login',
    })
    Notify({ type: 'warning', message: '请先登录', top: systemInfoStore.statusBarHeight })
  } else if (res.code == 200) {
    dailySongs.value = res.data.dailySongs
  }
})
const playSong = (id: number) => {
  playingStore.playNextSong(id.toString())
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const onScroll = (event: any) => {
  wx.createSelectorQuery()
    .select('#scroller')
    .boundingClientRect(
      debounce((res: any) => {
        scrollTop.value = event.detail.scrollTop
        offsetTop.value = res.top
        titleOpacity.value = +(event.detail.scrollTop / systemInfoStore.navHeight!).toFixed(2)
        if (event.detail.scrollTop < 10) {
          titleOpacity.value = 0
        }
      }, 200),
    )
    .exec()
}
const playVideo = (song: daily_song) => {
  uni.navigateTo({
    url: `/pages/playingvideo/playingvideo?songId=${song.id}&mvid=${song.mv}`,
  })
}
const openMenu = () => {
  // console.log('openMenu')
  showActionSheet.value = true
}
const closeActionSheet = () => {
  showActionSheet.value = false
}
</script>

<style lang="less">
#daily_rcmd {
  width: 100vw;
  height: 100vh;
  /* 标题栏 */
  .title_wrapper {
    width: 100%;
    // background-color: aqua;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    .title {
      background-color: #fff;
      opacity: 0.8;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 15px;
      }
    }
  }
  .scroll_view {
    padding-bottom: 20px;
    box-sizing: border-box;
    // background-color: cornflowerblue;
    // 日期栏
    .date_wrapper {
      height: 155px;
      background-color: aquamarine;
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 0 0 375px 375px/0 0 20px 20px;
      position: relative;
      .date_box {
        position: absolute;
        left: 20px;
        bottom: 44px;
        color: #fff;
        display: flex;
        flex-direction: column;
        .date {
          .day {
            font-size: 40px;
            font-weight: bold;
          }
          .line {
            margin: 0 2px;
          }
          .month {
            font-weight: bold;
          }
        }
        .ofrtune_box {
          font-size: 15px;
        }
      }
    }
    // 播放栏
    .play_all {
      width: 100%;
      height: 40px;
      // background-color: bisque;
      background-color: #fff;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .text {
          margin-left: 10px;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    // 歌曲
    .song_wrapper {
      height: 60px;
      padding: 0 10px;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        height: 40px;
        overflow: hidden;
        display: flex;
        .img_box {
          width: 40px;
          height: 40px;
          border-radius: 5px;
          overflow: hidden;
          .img {
            width: 100%;
            height: 100%;
            background-color: coral;
          }
        }
        .song_box {
          flex: 1;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          .name {
            letter-spacing: 0.05em;
          }
          .album_box {
            width: 100%;
            margin-top: 2px;
            display: flex;
            align-items: center;
            .tag {
              height: 12px;
              font-size: 9px;
              color: #f00;
              padding: 2px;
              background-color: rgba(255, 0, 0, 0.1);
              margin-right: 5px;
              border-radius: 4px;
            }
            .al_name {
              font-size: 12px;
              color: #666;
              letter-spacing: 0.05em;
            }
          }
        }
      }
      .right {
        height: 100%;
        display: flex;
        .btn {
          width: 35px;
          height: 100%;
          //background-color: chartreuse;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>

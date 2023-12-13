<template>
  <div id="ranking_songs">
    <div class="bg">
      <!-- 标题栏 -->
      <div class="title_wrapper" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px', height: systemInfoStore.navigationBarHeight + 'px' }">
        <van-icon name="arrow-left" size="20" @click="goBack" />
      </div>
      <div class="ranking_info_wrapper">
        <div class="ranking_info">
          <div class="ranking_name">{{ songList?.name }}</div>
          <div class="update_time">{{ date(songList?.trackUpdateTime as number) }}更新</div>
        </div>
      </div>
      <div class="operation_box">
        <div class="btn">
          <van-icon name="send-gift-o" size="20" />
          <span class="text">{{ Math.floor(songList?.subscribedCount! / 10000) }}万</span>
        </div>
        <div class="line"></div>
        <div class="btn">
          <van-icon name="chat-o" size="20" />
          <span class="text">{{ Math.floor(songList?.commentCount! / 10000) }}万</span>
        </div>
        <div class="line"></div>
        <div class="btn">
          <van-icon name="share-o" size="20" />
          <span class="text">{{ songList?.shareCount }}</span>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="song_list_wrapper">
      <div class="play_all_box">
        <van-icon name="play-circle" size="18" class="icon" />
        <span class="text">播放全部{{ songList?.trackCount }}</span>
      </div>
      <div class="song_box" hover-class="active" v-for="(item, index) in songList?.tracks" :key="item.id" @click="playSong(item.id as number)">
        <div class="left">
          <div class="index">{{ index + 1 }}</div>
          <div class="info_box">
            <div class="name van-ellipsis">{{ item.name }}</div>
            <div class="album van-ellipsis">{{ item.ar?.map((i) => i.name).join('、') + ' - ' + item.al?.name }}</div>
          </div>
        </div>
        <div class="menu_btn" @click.stop="openMenu">
          <van-icon name="ellipsis" size="20" style="rotate: 90deg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { reqSonglistDetail } from '@/api/songlist'
import type { SonglistDetailResponse, Playlist } from '@/api/songlist/type'
import { onLoad } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
const systemInfoStore = useSystemInfoStore()
onLoad((e: any) => {
  console.log(e)
  getData(e.id)
})
const songList = ref<Playlist>()
const getData = async (id: number) => {
  const res: SonglistDetailResponse = await reqSonglistDetail(id.toString())
  if (res.code == 200) {
    songList.value = res.playlist
  }
}

const goBack = () => {
  uni.navigateBack()
}
const playSong = (id: number) => {
  playingStore.playNextSong(id.toString())
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const openMenu = () => {
  console.log('openMenu')
}
const date = (timestamp: number) => {
  let date = new Date(timestamp)
  return date.getMonth() + 1 + '月' + date.getDate() + '日'
}
</script>

<style lang="less">
#ranking_songs {
  width: 100vw;
  height: 100vh;
  //   background-color: #bfa;
  .bg {
    background-color: pink;
    height: 220px;
    position: relative;
    //标题栏
    .title_wrapper {
      padding: 0 10px;
      display: flex;
      align-items: center;
    }
    .ranking_info_wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      .ranking_info {
        // background-color: #bfa;
        height: 100px;
        padding-top: 20px;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .ranking_name {
          font-size: 40px;
          font-weight: bold;
        }
        .update_time {
          font-size: 14px;
        }
      }
    }
    .operation_box {
      width: 270px;
      height: 42px;
      background-color: #fff;
      border-radius: 21px;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        width: 75px;
        height: 42px;
        text-wrap: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
          margin-left: 5px;
          font-size: 12px;
          font-weight: bold;
        }
      }
      .line {
        width: 1px;
        height: 20px;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  // 歌曲列表
  .song_list_wrapper {
    padding: 0 10px;
    box-sizing: border-box;
    .play_all_box {
      height: 60px;
      padding-top: 30px;
      box-sizing: border-box;
      .icon {
        padding: 0 10px;
        color: #fe3429;
      }
    }
    .song_box {
      width: 100%;
      height: 55px;
      //   background-color: chocolate;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:nth-child(1) .left .index,
      &:nth-child(2) .left .index,
      &:nth-child(3) .left .index {
        color: #fe3429;
      }
      &.active {
        background-color: #bfa;
      }
      .left {
        flex: 1;
        display: flex;
        .index {
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #999;
        }
        .info_box {
          display: flex;
          flex-direction: column;
          // align-items: center;
          justify-content: center;
          .name {
          }
          .album {
            font-size: 13px;
            color: #999;
          }
        }
      }
      .menu_btn {
        width: 30px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

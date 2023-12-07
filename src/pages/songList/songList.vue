<template>
  <div class="song_list" :style="{ backgroundImage: `url(${songListDetail?.coverImgUrl})` }">
    <div class="bg" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px' }">
      <!-- 标题栏 -->
      <div class="title_wrapper" :style="{ height: systemInfoStore.navigationBarHeight + 'px' }" @click="goBack">
        <div class="back_icon">
          <van-icon name="arrow-left" size="20" />
        </div>
        <span class="title">歌单</span>
      </div>
      <!-- 歌单信息 -->
      <div class="info_wrapper">
        <div class="top_info">
          <img :src="songListDetail?.coverImgUrl" class="img" />
          <div class="right">
            <div class="list_name">{{ songListDetail?.name }}</div>
            <div class="list_author">
              <img :src="songListDetail?.creator?.avatarUrl" class="img" />
              <div class="author_name">{{ songListDetail?.creator.nickname }}</div>
            </div>
            <div class="labels">
              <div class="label" v-for="label in songListDetail?.tags">{{ label }}</div>
            </div>
          </div>
        </div>
        <div class="bottom_desc van-multi-ellipsis--l2">{{ songListDetail?.description }}</div>
        <div class="btns_wrapper">
          <div class="share_btn btn">
            <van-icon name="share" />
            <span class="text">{{ songListDetail?.shareCount }}</span>
          </div>
          <div class="comment_btn btn">
            <van-icon name="chat" />
            <span class="text">{{ songListDetail?.commentCount }}</span>
          </div>
          <div class="sub_btn btn">
            <van-icon name="send-gift" />
            <span class="text">{{ songListDetail?.subscribedCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="list_wrapper">
      <scroll-view :scroll-y="true" class="scroll_view" :style="{ height: systemInfoStore.windowHeight! - systemInfoStore.navHeight! + 'px' }">
        <!-- <scroll-view scroll-y="true" class="scroll_view"> -->
        <songListMusicBox v-for="(item, index) in songListDetail?.tracks" :key="index" :music="item" :n="index + 1"></songListMusicBox>
      </scroll-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo'
import songListMusicBox from '@/components/song-list-music-box.vue'
// import { reqSongDetail } from '@/api/playing'
import { reqSonglistDetail } from '@/api/songlist'
import type { SonglistDetailResponse, Playlist } from '@/api/songlist/type'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
const systemInfoStore = useSystemInfoStore()
const songListDetail = ref<Playlist>()
onLoad((e: any) => {
  try {
    getSongListDetail(e.songListId)
  } catch (error) {
    Notify({ type: 'danger', message: '加载失败,请重试', top: systemInfoStore.statusBarHeight })
  }
})

const getSongListDetail = async (id: string) => {
  const res: SonglistDetailResponse = await reqSonglistDetail(id)
  if (res.code === 200) {
    songListDetail.value = res.playlist
    console.log('songListDetail.value: ', songListDetail.value)
  }
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="less">
.song_list {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .bg {
    width: 100%;
    backdrop-filter: blur(300px);
    background-size: cover;
    background-repeat: no-repeat;
    // 标题栏
    .title_wrapper {
      padding: 0 10px;
      display: flex;
      align-items: center;
      .back_icon {
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 5px;
      }
      .title {
        // margin-left: 10px;
      }
      color: #fff;
    }
    // 信息栏
    .info_wrapper {
      height: 230px;
      padding: 0 10px;
      padding-top: 10px;
      box-sizing: border-box;
      .top_info {
        height: 110px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img {
          width: 96px;
          height: 96px;
          border-radius: 10px;
          background-color: blanchedalmond;
        }
        .right {
          //   width: 245px;
          flex: 1;
          margin-left: 10px;
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .list_name {
            color: #fff;
            height: 40px;
            line-height: 25px;
            font-size: 13px;
            font-weight: bold;
          }
          .list_author {
            display: flex;
            align-items: center;
            .img {
              width: 25px;
              height: 25px;
              border-radius: 50%;
              background-color: blueviolet;
            }
            .author_name {
              color: #999;
              margin-left: 5px;
              font-size: 12px;
            }
          }
          .labels {
            height: 15px;
            display: flex;
            align-items: center;
            .label {
              color: #fff;
              font-size: 10px;
              padding: 2px 4px;
              background-color: rgba(255, 255, 255, 0.4);
              margin-right: 10px;
              border-radius: 5px;
              letter-spacing: 0.1em;
              &::after {
                content: '>';
              }
            }
          }
        }
      }
      .bottom_desc {
        margin-top: 10px;
        color: #fff;
        font-size: 14px;
        letter-spacing: 0.1em;
        max-height: 38px;
        &::after {
          content: '>';
        }
      }
      .btns_wrapper {
        height: 75px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 108px;
          height: 40px;
          color: #fff;
          border-radius: 20px;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          justify-content: center;
          align-items: center;
          .text {
            margin-left: 5px;
            font-size: 12px;
          }
        }
      }
    }
  }
  //歌单
  .list_wrapper {
    flex: 1;
    background-color: #eee;
    //   padding: 0 10px;
    .scroll_view {
    }
  }
}
</style>

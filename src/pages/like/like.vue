<template>
  <div>
    <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goBack" fixed />
    <scroll-view :scroll-y="true" style="padding-top: 90px; padding-bottom: 40px; height: 100%">
      <!-- <div style="background: #f00; height: 90px">{{ songs }}</div> -->
      <div class="song_wrapper" v-for="item in songs" :key="item.id">
        <div class="left" :style="{ width: `calc(100% - ${item.mv ? '70px' : '35px'})` }" @click="playSong(item.id as number)">
          <div class="img_box">
            <img :src="item.al?.picUrl" class="img" lazy-load />
          </div>
          <div class="song_box" :style="{ width: `calc(100% - ${item.mv ? '70px' : '35px'} - 40px)` }">
            <div class="name van-ellipsis">{{ item.name }}</div>
            <div class="album_box">
              <!-- <div class="tag" v-if="!!item.reason">{{ item.reason }}</div> -->
              <div class="al_name van-ellipsis">{{ item.ar?.map((i) => i.name).join('、') + ' - ' + item.al?.name }}</div>
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
    <bottomMusicBar></bottomMusicBar>
    <van-action-sheet :show="showActionSheet" title="菜单" @close="closeActionSheet">
      <div>内容</div>
      <div>内容</div>
      <div>内容</div>
    </van-action-sheet>
  </div>
</template>
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { reqLikelist, reqRecentSongs } from '@/api/like'
import type { LikeListResponse, ListItem, RecentSongsResponse } from '@/api/like/type'
import { useUserStore } from '@/stores/user'
import { reqSongDetail } from '@/api/playing'
import { reactive, ref } from 'vue'
import type { SongDetailResponse } from '@/api/playing/type'
import type { song } from '@/api/index/type'
// import type { daily_song } from '@/api/daily_rcmd_song/type'
import { usePlayingStore } from '@/stores/playing'
import bottomMusicBar from '@/components/bottom-music-bar.vue'
const userStore = useUserStore()
const playingStore = usePlayingStore()
const showActionSheet = ref<boolean>(false)
let title = ref<string>('我喜欢的音乐')
let songs = ref<song[]>([])
// let recentSongs = ref<ListItem[]>([])
onLoad((e: any) => {
  console.log('type: ', e.type)
  if (e.type === 'like') {
    getData()
    console.log('like')
  } else {
    title.value = '最近播放'
    getRecent()
  }
})
// 返回
const goBack = () => {
  uni.navigateBack()
}
// 加载数据
const getData = async () => {
  try {
    const res: LikeListResponse = await reqLikelist(userStore.userinfo.profile.userId)
    if (res.code === 200) {
      const res2: SongDetailResponse = await reqSongDetail(res.ids.join(','))
      if (res2.code === 200) {
        songs.value = res2.songs as song[]
      } else {
        uni.showToast({
          title: '网络不好',
          icon: 'none',
        })
      }
    } else {
      uni.showToast({
        title: '网络不好',
        icon: 'none',
      })
    }
  } catch (error) {}
}
const getRecent = async () => {
  try {
    const res: RecentSongsResponse = await reqRecentSongs()
    if (res.code === 200) {
      // recentSongs.value = res.data.list
      songs.value = res.data.list.map((item) => item.data)
    }
  } catch (error) {}
}
const playSong = (id: number) => {
  playingStore.playNextSong(id.toString())
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const playVideo = (song: song) => {
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

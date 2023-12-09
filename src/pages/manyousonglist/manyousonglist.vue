<template>
  <div id="manyou_songlist" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px' }">
    <!-- 标题栏 -->
    <div class="title_wrapper" :style="{ height: systemInfoStore.navigationBarHeight + 'px' }">
      <div class="back_btn" @click="goBack">
        <van-icon name="arrow-left" size="20" />
        <span class="title">歌单漫游</span>
      </div>
    </div>
    <!-- 歌单卡片 -->
    <swiper class="swiper_wrapper" :vertical="true" :next-margin="nextMargin + 'px'" @change="change">
      <swiper-item class="swiper_item" v-for="(item, index) in songlistDetails" :key="index">
        <div class="manyou_songlist_music_box">
          <div class="top_wrapper">
            <div class="songlist_wrapper">
              <img :src="item.playlist!.coverImgUrl" alt="" class="left_img" />
              <div class="right">
                <div class="title">{{ item.playlist?.name }}</div>
                <div class="author_box">
                  <img :src="item.playlist?.creator.avatarUrl" alt="" class="avatar_img" />
                  <div class="author">{{ item.playlist?.creator.nickname }}</div>
                </div>
              </div>
            </div>
            <div class="operation_wrapper">
              <div class="operation_box">
                <div class="play_box">
                  <van-icon class="icon" name="play-circle" size="18" />
                  <span class="text">听听看</span>
                </div>
                <div class="lien" style="width: 2px; height: 14px; background-color: #3333332d; margin: 0 20px"></div>
                <div class="collect_box">
                  <van-icon class="icon" name="invitation" size="18" />
                  <span class="text">收藏</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom_wrapper">
            <div class="tip">你可能喜欢的歌曲</div>
            <div class="song_wrapper" v-for="m in item.playlist?.tracks.slice(0, 6)" :key="m.id" @click="playsong(m.id!.toString())">
              <div class="song_info">
                <div class="name van-ellipsis">{{ m.name }}</div>
                <div class="album_box">
                  <!-- <div class="tag">超清母带</div> -->
                  <div class="album van-ellipsis">{{ m.ar?.map((i) => i.name).join('、') + ' - ' + m.al?.name }}</div>
                </div>
                <!-- <div class="tag2">超94%的人播放</div> -->
              </div>
              <div class="operation_wrapper">
                <div class="btn"><van-icon class="icon" name="video-o" size="25" v-if="m.mv" @click="playvideo(m)" /></div>
                <div class="btn"><van-icon class="icon" name="ellipsis" size="20" @click.stop="openMenu(m)" /></div>
              </div>
            </div>
            <div class="mask_wrapper">
              <span>点击查看更多 ></span>
            </div>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <bottomMusicBar></bottomMusicBar>
    <SongListSheet></SongListSheet>
    <van-notify id="van-notify" />
  </div>
</template>

<script setup lang="ts">
import { useSystemInfoStore } from '@/stores/systemInfo'
import { ref } from 'vue'
import { onMounted } from 'vue'
import bottomMusicBar from '@/components/bottom-music-bar.vue'
import SongListSheet from '@/components/song-list-sheet.vue'
import { onLoad } from '@dcloudio/uni-app'
import { useIndexDataStore } from '@/stores/indexData'
import { reqSonglistDetail } from '@/api/songlist'
import type { SonglistDetailResponse } from '@/api/songlist/type'
import { usePlayingStore } from '@/stores/playing'
import type { song } from '@/api/index/type'
const indexDataStore = useIndexDataStore()
const systemInfoStore = useSystemInfoStore()
const nextMargin = ref<number>(0)
const songlistIds = ref<string[]>([])
const songlistDetails = ref<SonglistDetailResponse[]>([])
// const = indexDataStore.
indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives
const playingStore = usePlayingStore()
onLoad((e: any) => {
  console.log()
  setNextMargin()
  setSonglistIds(e.songListId)
  console.log('e.songlist: ', e.songListId)
  getSonglistDetail()
})
onMounted(() => {})

const goBack = () => {
  uni.navigateBack()
}
const change = (e: any) => {
  console.log(e.detail)
  // console.log(songlistIds.value)
}
const setNextMargin = () => {
  let height = systemInfoStore.safeArea?.height
  height! -= systemInfoStore.navHeight!
  // console.log('manyou_height: ', height)
  /* 
  6   647
  x   734
  */
  if (height! <= 600) {
    nextMargin.value = height! - 480
  } else if (height! <= 650) {
    nextMargin.value = height! - 430
  } else if (height! <= 700) {
    nextMargin.value = height! - 490
  } else if (height! <= 750) {
    nextMargin.value = height! - 430
  } else {
    nextMargin.value = height! - 450
  }
}
const setSonglistIds = (songlist: string) => {
  indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.[0].resources?.forEach((item) => {
    songlistIds.value.push(item.resourceId)
  })
  indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.slice(1, 6).forEach((item) => {
    songlistIds.value.push(item.creativeId as string)
  })
  songlistIds.value.splice(songlistIds.value.indexOf(songlist), 1)
  songlistIds.value.unshift(songlist)
  console.log('songlistIds.value: ', songlistIds.value)
}
const getSonglistDetail = () => {
  songlistIds.value.forEach(async (id) => {
    const res: SonglistDetailResponse = await reqSonglistDetail(id)
    songlistDetails.value.push(res)
  })
}
const playsong = (id: string) => {
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
  playingStore.playNextSong(id)
}
const playvideo = (music: song) => {
  uni.navigateTo({
    url: `/pages/playingvideo/playingvideo?mvid=${music.mv}&songId=${music.id}`,
  })
}
const openMenu = (music: song) => {
  console.log('openMenu')
}
</script>

<style lang="less">
#manyou_songlist {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(to bottom, #41413f, #696a65);

  //标题栏
  .title_wrapper {
    padding: 0 15px;
    box-sizing: border-box;
    // background-color: #343;
    display: flex;
    align-items: center;
    color: #fff;
    .back_btn {
      .title {
        font-size: 18px;
        margin-left: 10px;
      }
    }
  }
  // 歌单跑马灯
  .swiper_wrapper {
    width: 100vw;
    height: 700px;
    padding: 10px 15px;
    box-sizing: border-box;
    // background-color: blueviolet;
    height: 100%;
    .swiper_item {
      width: 100%;
      // height: 540px !important;
      height: 540px;
      // overflow: hidden;
      border-radius: 20px;
      background-color: #fff;
      .manyou_songlist_music_box {
        width: 100%;
        height: 520px;
        position: relative;
        .top_wrapper {
          height: 165px;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          // align-items: center;
          position: relative;
          .songlist_wrapper {
            width: 100%;
            height: 150px;
            padding: 15px;
            box-sizing: border-box;
            background-color: rgb(79, 124, 124);
            background-size: 100%;
            backdrop-filter: blur(10px);
            border-radius: 0 0 375px 375px/0 0 40px 40px;
            display: flex;
            // align-items: center;
            .left_img {
              width: 90px;
              height: 90px;
              background-color: #fff;
              border-radius: 20px;
            }
            .right {
              flex: 1;
              height: 90px;
              padding: 10px;
              padding-top: 5px;
              box-sizing: border-box;
              // background-color: blueviolet;
              .title {
                color: #fff;
                font-size: 15px;
              }
              .author_box {
                display: flex;
                align-items: center;
                margin-top: 10px;

                .avatar_img {
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  background-color: chartreuse;
                  margin-right: 6px;
                }
                .author {
                  font-size: 12px;
                  color: #ddd;
                }
              }
            }
          }
          .operation_wrapper {
            // width: 100%;
            // height: 40px;
            // background-color: #fff;
            // position: relative;
            .operation_box {
              position: absolute;
              bottom: 0;
              left: 50%;
              width: 230px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
              border-radius: 20px;
              background-color: #fff;
              transform: translateX(-50%);
              .play_box {
                .icon {
                  color: #fc3123;
                }
                .text {
                  margin-left: 5px;
                }
              }
              .collect_box {
                .icon {
                  color: #fc3123;
                }
                .text {
                  margin-left: 5px;
                }
              }
            }
          }
        }
        .bottom_wrapper {
          width: 100%;
          // max-height: 355px;
          height: 360px;
          overflow: hidden;
          // background-color: rgb(224, 130, 16);
          padding: 0 15px;
          box-sizing: border-box;
          border-radius: 20px;
          position: relative;

          .tip {
            font-size: 11px;
            color: #666;
            margin-top: 5px;
            // background-color: cyan;
          }
          .song_wrapper {
            // background-color: blue;
            width: 100%;
            margin-top: 17px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            box-sizing: border-box;
            .song_info {
              flex: 1;
              width: calc(100% - 80px);
              .name {
                color: #333;
                font-size: 15px;
              }
              .album_box {
                display: flex;
                align-items: center;
                .tag {
                  height: 13px;
                  font-size: 8px;
                  border: 0.1px solid #c2ab66;
                  border-radius: 3px;
                  padding: 1px 2px;
                  box-sizing: border-box;
                  margin-right: 5px;
                }
                .album {
                  font-size: 12px;
                  color: #666;
                }
              }
              .tag2 {
                display: inline-block;
                padding: 1px;
                box-sizing: border-box;
                border-radius: 3px;
                height: 14px;
                font-size: 10px;
                color: #e29367;
                background-color: #fff2ea7b;
              }
            }
            .operation_wrapper {
              // height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 100%;
                background-color: #fff;
                &:nth-child(2) .icon {
                  transform: rotateZ(90deg);
                }
                .icon {
                  opacity: 0.5;
                }
              }
              // .menu_btn {
              //   display: flex;
              //   align-items: center;
              //   width: 30px;
              //   height: 100%;
              //   background-color: #eee;
              // }
            }
          }
          .mask_wrapper {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 90px;
            // backdrop-filter: blur(2px);
            background-image: linear-gradient(to top, #fff, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85));
            color: #666;
            font-size: 13px;
            text-align: center;
            padding-top: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>

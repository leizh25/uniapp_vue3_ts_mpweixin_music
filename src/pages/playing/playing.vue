<template>
  <div id="playing_wrapper" :style="{ backgroundImage: `url(${playingStore.playingSongInfo.al?.picUrl})` }">
    <div class="bg" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px' }">
      <!-- 标题 -->
      <div class="title_bar" :style="{ height: systemInfoStore.navigationBarHeight + 'px' }">
        <div class="back_btn" @click="goBack"><van-icon name="arrow-left" size="20px" /></div>
        <div class="title">{{ playingStore.playingSongInfo.name }}</div>
      </div>
      <!-- 磁盘 -->

      <!-- 磁盘 歌词 切换 -->
      <swiper class="swiper">
        <swiper-item class="swiper_item1">
          <div class="disk_wrapper">
            <div class="needle" :class="{ rotate: playingStore.isPlaying }">
              <img src="/static/img/playing/needle.png" class="img" />
            </div>
            <div class="disk">
              <div class="img_wrapper" :class="{ rotate: playingStore.isPlaying }">
                <img src="/static/img/playing/disc.png" class="img" :style="{ backgroundImage: `url(${playingStore.playingSongInfo.al?.picUrl})` }" />
              </div>
            </div>
            <div class="lyric_tip_wrapper" v-show="playingStore.isShowLyricsTip" @click="closeLyricsTip">
              <span class="text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;左划显示歌词&nbsp;&nbsp;>></span>
              <span class="text2">&nbsp;&nbsp;点击关闭提示</span>
            </div>
          </div>
        </swiper-item>
        <swiper-item class="swiper_item2">
          <div class="lrc_wrapper">
            <scroll-view :scroll-y="true" class="scroll_view" :scroll-top="playingStore.lrcScrollTop" :scroll-with-animation="true">
              <div v-for="item in 4" :key="item" class="lrc_item"></div>
              <div v-if="playingStore.processedLrc.lrcText" v-for="(item, key, index) in playingStore.processedLrc.lrcText" :key="index" class="lrc_item" :class="{ active: playingStore.lrcScrolledCount == index }">{{ item }}</div>
              <div v-else class="lrc_item">暂无歌词</div>
              <div v-for="item in 4" :key="item" class="lrc_item"></div>
            </scroll-view>
          </div>
        </swiper-item>
      </swiper>
      <!-- 占位 -->
      <!-- <div class="zhanwei" style=""></div> -->
      <!-- 歌曲信息 -->
      <div class="info_wrapper">
        <div class="info">
          <div class="songName_wrapper">
            <span class="songName">
              {{ playingStore.playingSongInfo.name }}
            </span>
            <img src="/static/img/playing/vip.png" class="img" v-if="playingStore.playingSongInfo.fee == 1" />
          </div>
          <div class="artist">{{ playingStore.playingSongInfo.ar?.map((item) => item.name).join('、') }}</div>
        </div>
        <div class="like_wrapper">
          <van-icon name="like-o" size="25px" />
          <van-icon name="like" size="25px" />
          <span class="text">123</span>
        </div>
        <div class="comment_wrapper">
          <van-icon name="comment-o" size="25px" />
          <span class="text">123</span>
        </div>
      </div>
      <!-- 进度条 -->
      <div class="progress_wrapper">
        <div class="progress_box">
          <div class="valid_dot" :style="validProgressObj" v-if="playingStore.playingSongInfo.fee == 1"></div>
          <!-- <van-progress :percentage="progress" show-pivot="false" /> -->
          <van-slider class="slider" :value="playingStore.progressPercent" use-button-slot @drag="onSliderDrag">
            <div class="custom-button" slot="button">{{ playingStore.progressPercent }}</div>
          </van-slider>
        </div>
        <div class="time_box">
          <span class="time">{{ progressTime }}</span>
          <span class="time">{{ duration }}</span>
        </div>
      </div>
      <!-- 操作栏 -->
      <div class="operation_wrapper">
        <div class="mode_box">
          <div class="btn_box" @click="changeMode">
            <img src="/static/img/playing/suijibofang.png" class="img" />
            <!-- <img src="/static/img/playing/suijibofang.svg" class="img" /> -->
          </div>
        </div>
        <div class="last_box">
          <div class="btn_box" @click="playPrev">
            <img src="/static/img/playing/shangyishou.png" class="img" />
            <!-- <img src="/static/img/playing/shangyishou.svg" class="img" /> -->
          </div>
        </div>
        <div class="play_pause_box">
          <div class="btn_box" @click="playPause">
            <!-- <img src="/static/img/playing/bofang.png" v-if="!playingStore.isPlaying" class="img" />
            <img src="/static/img/playing/zanting.png" v-else class="img" /> -->
            <van-icon name="play" size="40" v-if="!playingStore.isPlaying" class="img" />
            <van-icon name="pause" size="40" v-else class="img" />
            <!-- <img src="/static/img/playing/zanting.svg" alt="" class="img" /> -->
          </div>
        </div>
        <div class="next_box">
          <div class="btn_box" @click="playNext">
            <img src="/static/img/playing/xiayishou.png" class="img" />
            <!-- <img src="/static/img/playing/xiayishou.svg" class="img" /> -->
          </div>
        </div>
        <div class="menu_box">
          <div class="btn_box" @click="showMenu">
            <img src="/static/img/playing/liebiao.png" class="img" />
            <!-- <img src="/static/img/playing/liebiao.svg" class="img" /> -->
          </div>
        </div>
      </div>
      <!-- 底部容器 -->
      <div class="bottom_wrapper"></div>
    </div>
    <songListSheet></songListSheet>
    <van-notify id="van-notify" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, reactive } from 'vue'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { usePlayingStore } from '@/stores/playing'
import songListSheet from '@/components/song-list-sheet.vue'
// import _ from 'lodash-es'
import throttle from '@/utils/throttle'
import debounce from '@/utils/debounce'
const playingStore = usePlayingStore()
const systemInfoStore = useSystemInfoStore()
// const isPlaying = playingStore.isPlaying
onMounted(async () => {
  // try {
  //   await playingStore.getDetail()
  // } catch (error) {
  //   return
  // }
  // try {
  //   await playingStore.getSongUrl()
  //   playingStore.play()
  // } catch (error) {}
  // try {
  //   await playingStore.getLrc()
  //   // console.log(playingStore.processedLrc)
  // } catch (error) {}
  // console.log('playingStore:', playingStore)
})
// 关闭显示歌词函数
const closeLyricsTip: any = computed(() => {
  playingStore.isShowLyricsTip = false
})
// 歌曲时长
const duration = computed(() => {
  return (
    parseInt((playingStore.playingSongInfo.dt! / 60000).toString()) +
    ':' +
    (parseInt(((playingStore.playingSongInfo.dt! % 60000) / 1000).toString()).toString().length == 1 ? '0' + parseInt(((playingStore.playingSongInfo.dt! % 60000) / 1000).toString()) : parseInt(((playingStore.playingSongInfo.dt! % 60000) / 1000).toString()))
  )
})
// const validProgress = parseInt((playingStore.validDuration * 1000) / playingStore.songInfo.dt)
const validProgressObj = reactive({ left: '' })
watch(
  () => playingStore.validDuration,
  (newVal) => {
    validProgressObj.left = Math.floor(((newVal * 1000) / playingStore.playingSongInfo.dt!) * 100) + '%'
  },
)
//歌曲进度
// const progress = ref(0)
const progressTime = ref('00:00')
// 会员歌曲可播放进度
// const validProgress = ref(0)
watch(
  () => playingStore.currentTime,
  (newValue) => {
    // progress.value = parseInt(((newValue * 1000) / playingStore.songInfo.dt) * 100)
    let m = parseInt((newValue / 60).toString())
    let s = parseInt((newValue % 60).toString()).toString().length == 1 ? '0' + parseInt((newValue % 60).toString()) : parseInt((newValue % 60).toString())
    progressTime.value = m + ':' + s

    // validProgress.value = parseInt((playingStore.validDuration * 1000) / playingStore.songInfo.dt)
  },
)

const goBack = () => {
  uni.navigateBack({
    delta: 1,
  })
}
// 播放模式
const changeMode = () => {
  console.log('播放模式')
}
// 上一首
const playPrev = throttle(() => {
  console.log('上一首')
  playingStore.playPrevSong()
}, 3000)

// 播放暂停
const playPause = debounce(() => {
  if (!playingStore.isPlaying) {
    playingStore.play()
  } else {
    playingStore.pause()
  }
}, 300)

// 下一首
const playNext = throttle(() => {
  console.log('下一首')
  playingStore.playNextSong()
}, 3000)
// 播放列表
const showMenu = () => {
  console.log('播放列表')
  playingStore.isShowSongListSheet = true
}
// 进度条拖动事件
const onSliderDrag = (e: any) => {
  console.log('进度条拖动事件')
  // playingStore.seek(e.detail.value)
  console.log('e.detail.value: ', e.detail.value)
}
</script>

<style lang="less">
#playing_wrapper {
  height: 100vh;
  max-height: 100vh;
  background-color: #999;
  box-sizing: border-box;
  background-size: 100% 100%;
  overflow: hidden;
  .bg {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(400px);
    // padding: 12px;
    box-sizing: border-box;
    // 标题栏
    .title_bar {
      padding-left: 10px;
      box-sizing: border-box;
      background-origin: padding-box;
      // background-color: #bfa;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .back_btn {
        height: 100%;
        position: absolute;
        left: 10px;
        display: flex;
        align-items: center;
        mix-blend-mode: difference;
        filter: invert(1) grayscale(1) contrast(2);
      }
      .title {
        // color: #eee;
        mix-blend-mode: difference;
        filter: invert(1) grayscale(1) contrast(2);
      }
    }
    // 磁盘 和 歌词切换
    .swiper {
      height: 400px;
      flex: 1;
      // 磁盘
      .swiper_item1 {
        // background-color: darkgreen;
        //   磁盘
        .disk_wrapper {
          height: 100%;
          // background-color: burlywood;
          .needle {
            width: 192rpx;
            height: 274rpx;
            position: relative;
            // background-color: #ffffff4a;
            left: 50%;
            top: 40rpx;
            z-index: 10;
            transform-origin: 0 0;
            transform: rotate(-30deg) translateX(-40rpx);
            transition: transform 0.5s;
            &.rotate {
              transform: rotate(5deg) translateX(-40rpx);
            }

            &::before {
              content: '';
              width: 55rpx;
              height: 50rpx;
              border-radius: 50%;
              z-index: 12;
              // border: 5rpx solid rgba(255, 255, 255, .1);
              // opacity: .5;
              background-color: #fff;
              position: absolute;
              left: 13rpx;
              top: -26rpx;
            }
            .img {
              width: 100%;
              height: 100%;
            }
          }
          .disk {
            transform: translateY(-60rpx);
            // background-color: aquamarine;
            display: flex;
            justify-content: center;
            .img_wrapper {
              width: 550rpx;
              height: 550rpx;
              // background-color: chocolate;
              &.rotate {
                animation: playing 8s linear 0.5s infinite;
                @keyframes playing {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }
              }

              .img {
                width: 100%;
                height: 100%;
                background-size: 350rpx;
                background-repeat: no-repeat;
                background-position: center;
              }
            }
          }
          .lyric_tip_wrapper {
            width: 100%;
            height: 40px;
            // background-color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            mix-blend-mode: difference;
            filter: invert(1) grayscale(1) contrast(2);
            .text {
              background: #1b1a1a linear-gradient(to left, transparent, #fff, transparent) no-repeat 0 0;
              background-size: 20% 100%;
              background-position: 0 0;
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              animation: shine 3s infinite;
              @keyframes shine {
                from {
                  background-position: 0% 0%;
                }
                to {
                  background-position: 100% 100%;
                }
              }
            }
            .text2 {
              font-size: 14px;
            }
          }
        }
      }
      // 歌词
      .swiper_item2 {
        .lrc_wrapper {
          height: 100%;
          padding: 10px;
          box-sizing: border-box;
          .scroll_view {
            height: 100%;
            .lrc_item {
              height: 40px;
              line-height: 40px;
              text-align: center;
              // background-color: aqua;
              transition: all 0.3s;
              mix-blend-mode: difference;
              filter: invert(1) grayscale(1) contrast(2);
              &.active {
                font-size: 20px;
                text-shadow: rgb(255, 255, 255) 1px 0 10px;
                color: orange;
              }
            }
          }
        }
      }
    }

    //歌曲信息
    .info_wrapper {
      height: 60px;
      padding: 0 20px;
      // color: #eee;
      mix-blend-mode: difference;
      filter: invert(1) grayscale(1) contrast(2);
      // background-color: cadetblue;
      display: flex;
      .info {
        width: 220px;
        // background-color: #c56868;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .songName_wrapper {
          display: flex;
          align-content: center;
          .songName {
            font-size: 18px;
            font-weight: 600;
            overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
            white-space: nowrap; //（设置文字在一行显示，不能换行）
            text-overflow: ellipsis;
          }
          .img {
            width: 20px;
            height: 20px;
            margin-left: 5px;
            border-radius: 4px;
            background-color: #b99292;
          }
        }
        .artist {
          font-size: 13px;
          margin-top: 5px;
          overflow: hidden; //（文字长度超出限定宽度，则隐藏超出的内容）
          white-space: nowrap; //（设置文字在一行显示，不能换行）
          text-overflow: ellipsis;
        }
      }
      .like_wrapper {
        flex: 1;
        // background-color: blueviolet;
      }
      .comment_wrapper {
        flex: 1;
        // background-color: #b90f0f;
      }
      .like_wrapper,
      .comment_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .text {
          font-size: 12px;
        }
      }
    }
    // 进度条
    .progress_wrapper {
      // background-color: darkgray;
      height: 70px;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .progress_box {
        width: 100%;
        position: relative;
        .valid_dot {
          width: 35rpx;
          height: 35rpx;
          background-image: url(/static/img/playing/valid_dot.png);
          background-size: 100%;
          // background-color: #fff;
          transform: translateX(-50%);
          position: absolute;
          // left: 100%;
          top: -28rpx;
        }
        .slider {
          .custom-button {
            width: 15px;
            height: 15px;
            line-height: 15px;
            background-color: #fff;
            border-radius: 50%;
            // padding: 3px;
            font-size: 10px;
            text-align: center;
            align-items: center;
            flex-direction: column;
          }
        }
      }
      .time_box {
        // color: #eee;
        mix-blend-mode: difference;
        filter: invert(1) grayscale(1) contrast(2);
        margin-top: 4px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
    // 操作
    .operation_wrapper {
      height: 70px;
      padding: 0 20px;
      // background-color: rgb(218, 38, 38);
      display: flex;
      justify-content: center;

      // 公共样式
      .mode_box,
      .last_box,
      .play_pause_box,
      .next_box,
      .menu_box {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn_box {
          width: 30px;
          height: 30px;
          // background-color: #fff;
          .img {
            mix-blend-mode: difference;
            filter: invert(1) grayscale(1) contrast(2);
            width: 100%;
            height: 100%;
          }
        }
      }
      // 播放模式
      .mode_box {
        width: 70px;
        // background-color: #a06464;
      }
      // 上一首
      .last_box {
        width: 70px;
        // background-color: rgb(63, 157, 48);
      }
      // 播放暂停
      .play_pause_box {
        width: 70px;
        // background-color: rgba(255, 255, 255, 0.662);
        .btn_box {
          width: 40px;
          height: 40px;
        }
      }
      // 下一首
      .next_box {
        width: 70px;
        // background-color: rgb(34, 67, 151);
      }
      // 播放列表
      .menu_box {
        width: 70px;
        // background-color: #8a2477;
      }
    }
    // 底部容器
    .bottom_wrapper {
      height: 30px;
      // flex: 1;
      // background-color: rgb(130, 177, 28);
    }
  }
  // actionSheet
  .action_sheet_wrapper {
    height: 300px;
    .tabs_wrapper {
      height: 100%;
    }
  }
}
</style>

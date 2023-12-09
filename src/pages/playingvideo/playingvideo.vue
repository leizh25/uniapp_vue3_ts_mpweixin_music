<template>
  <div id="playing_video" :style="{ paddingTop: systemInfoStore.statusBarHeight + 'px' }">
    <!-- 标题 -->
    <div class="title_wrapper" :style="{ height: systemInfoStore.navigationBarHeight + 'px' }">
      <!-- <div class="title_box" :style="{ width: 375 - systemInfoStore.custom.width - 20 + 'px' }"> -->
      <div class="title_box">
        <van-icon name="arrow-left" size="20px" @click="goBack" />
        <span class="text">{{ mv?.name }}</span>
        <div class="zhanwei"></div>
      </div>
    </div>
    <!-- 视频 -->
    <div class="video_wrapper">
      <video id="video" :src="url" controls></video>
    </div>
    <!-- 滚动视图 -->
    <scroll-view :scroll-y="true" class="scroll_view" :style="{ height: systemInfoStore.safeArea!.height! - systemInfoStore.navigationBarHeight! - 210 - 10 + 'px' }">
      <!-- 作者 -->
      <div class="author_wrapper">
        <div class="left">
          <img :src="mv?.artists[0].img1v1Url" alt="" class="img" />
          <div class="author_box">
            <div class="author">{{ mv?.artistName }}</div>
            <div class="count">
              <span class="text">100万粉丝</span>
              <span class="text">89视频</span>
            </div>
          </div>
        </div>
        <div class="care_btn">
          <van-icon name="plus" />
          <span>关注</span>
        </div>
      </div>
      <!-- 信息 -->
      <div class="info_wrapper">
        <div class="mv_title_wrapper">
          <img src="/static/img/playingvideo/mv.png" class="img" />
          <span>{{ mv?.name }}</span>
        </div>
        <div class="attach_song">
          <div class="song_name" @click="goPage">
            <img src="/static/img/playingvideo/yinfu.png" alt="" class="img" />
            <span class="text">{{ mv?.name }}-{{ mv?.artistName }}</span>
          </div>
          <div class="mv_info">
            <span class="text">{{ parseInt((mv?.playCount! / 10000).toString()) }}万次播放</span>
            <span class="text">{{ mv?.publishTime }}</span>
          </div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="operation_wrapper">
        <div class="btn_box">
          <img src="/static/img/playingvideo/shoucang.png" class="img" />
          <div class="text">{{ operationCounts?.likedCount }}</div>
        </div>
        <div class="btn_box">
          <img src="/static/img/playingvideo/zhuanfa.png" class="img" />
          <div class="text">{{ operationCounts?.shareCount }}</div>
        </div>
        <div class="btn_box">
          <img src="/static/img/playingvideo/pinglun.png" class="img" />
          <div class="text">{{ operationCounts?.commentCount }}</div>
        </div>
        <div class="btn_box">
          <img src="/static/img/playingvideo/dianzan.png" class="img" />
          <div class="text">点赞</div>
        </div>
      </div>
      <!-- 相关视频 -->
      <div class="related_video_wrapper">
        <longVideoBox v-for="item in simiMVs" :key="item.id" :mv="item"></longVideoBox>
      </div>
    </scroll-view>
    <van-notify id="van-notify" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSystemInfoStore } from '@/stores/systemInfo'
import longVideoBox from '@/components/long-video-box.vue'
import { onLoad } from '@dcloudio/uni-app'
import { request } from '@/utils/request'
import { reqMvDetail, reqMvUrl, reqSemiMv, reqMvPrimeInfo } from '@/api/playingvideo'
import type { MvDetailResponse, MvUrlResponse, SemiMvResponse, mv, MvPrimeInfoResponse, MvData } from '@/api/playingvideo/type'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'

const systemInfoStore = useSystemInfoStore()
// console.log('systemInfoStore: ', systemInfoStore)
const mv = ref<MvData>()
const url = ref<string>()
const simiMVs = ref<mv[]>([])
const operationCounts = ref<MvPrimeInfoResponse>()
const songId = ref('')
onLoad(async (e: any) => {
  //   console.log('onLoadplayingvideo:', e.mvid)
  songId.value = e.songId || ''
  init(e.mvid)
})

/**
 *
 * @param {number} mvid MVID
 * @param {boolean} flag 是否刷新MV信息
 */
const init = async (mvid: string, flag = false) => {
  try {
    await getMvDetail(mvid)
  } catch (error) {
    console.log('获取MV信息失败: ', error)
    // Notify({
    //   message: 'MV信息加载失败,请重试',
    //   type: 'danger',
    // })
  }

  try {
    await getMvUrl(mvid)
  } catch (error) {
    console.log('获取MV播放失败: ', error)
    // Notify({
    //   message: 'MV播放加载失败,请重试',
    //   type: 'danger',
    // })
  }

  try {
    await getoperationCounts(mvid)
  } catch (error) {
    console.log('获取点赞转发数据失败: ', error)
  }
  if (flag) return

  try {
    await getSimiMV(mvid)
  } catch (error) {
    console.log('获取相似MV失败: ', error)
  }
}
const goBack = () => {
  uni.navigateBack()
}
//获取mv详情
const getMvDetail = async (mvid: string) => {
  try {
    const res: MvDetailResponse = await reqMvDetail(mvid)
    if (res.code === 200) {
      mv.value = res.data
    } else {
      throw new Error(`${res}`)
    }
  } catch (error) {
    console.log('error: ', error)
    Notify({ message: 'MV信息加载失败,请重试', type: 'danger' })
  }
}
//获取mv播放地址
const getMvUrl = async (mvid: string) => {
  try {
    const res: MvUrlResponse = await reqMvUrl(mvid)
    if (res.code === 200) {
      url.value = res.data.url
    } else {
      throw new Error(`${res}`)
    }
  } catch (error) {
    console.log('MV播放加载失败,请重试')
    Notify({
      message: 'MV播放加载失败,请重试',
      type: 'danger',
    })
  }
}
//获取相似MV
const getSimiMV = async (mvid: string) => {
  const res: SemiMvResponse = await reqSemiMv(mvid)
  if (res.code === 200) {
    simiMVs.value = res.mvs
  }
}
//获取mv评论转发点赞数据
const getoperationCounts = async (mvid: string) => {
  const res: MvPrimeInfoResponse = await reqMvPrimeInfo(mvid)
  if (res.code === 200) {
    operationCounts.value = res
  }
}

//跳转音乐播放页
const goPage = () => {
  uni.navigateTo({
    url: '/pages/playing/playing?id=' + songId.value,
  })
}
</script>

<style lang="less">
#playing_video {
  //   padding-bottom: 20px;
  overflow: hidden;
  border-bottom: 0.1px solid rgba(100, 100, 100, 0.05);
  //   display: flex;
  //   flex-direction: column;
  // 标题栏
  .title_wrapper {
    padding: 0 10px;
    // background-color: coral;
    // box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    .title_box {
      height: 100%;
      display: flex;
      //   justify-content: space-between;
      align-items: center;
      //   background-color: aqua;
      .text {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
  //视频栏
  .video_wrapper {
    height: 210px;
    background-color: #bfa;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    #video {
      width: 100%;
      height: 100%;
    }
  }
  .scroll_view {
    // padding-bottom: 20px;
    // box-sizing: border-box;
    //作者栏
    .author_wrapper {
      height: 40px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // background-color: #bfa;
      .left {
        display: flex;
        align-items: center;
        .img {
          width: 34px;
          height: 34px;
          background-color: #b13636;
          border-radius: 50%;
        }
        .author_box {
          margin-left: 10px;
          margin-top: 5px;
          // box-sizing: border-box;
          // display: flex;
          // flex-direction: column;
          // justify-content: center;
          .author {
            font-size: 15px;
          }
          .count {
            font-size: 10px;
            color: #666;
            .text {
              margin-right: 5px;
            }
          }
        }
      }
      .care_btn {
        border: 0.5px solid #f00;
        border-radius: 15px;
        padding: 2px 5px;
        font-size: 14px;
        color: #f00;
      }
    }
    //信息
    .info_wrapper {
      padding: 0 10px;
      .mv_title_wrapper {
        height: 30px;
        //   background-color: cadetblue;
        // text-align: center;
        display: flex;
        align-items: center;
        .img {
          width: 25px;
          height: 20px;
          margin-right: 5px;
        }
      }
      .attach_song {
        //   background-color: #d7dd9c;
        height: 45px;
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .song_name {
          .img {
            width: 20px;
            height: 10px;
          }
          .text {
            color: #4e7ba8;
            font-size: 14px;
          }
        }
        .mv_info {
          // display: flex;
          // flex-direction: column;
          .text {
            font-size: 11px;
            margin-right: 10px;
          }
        }
      }
    }
    //操作栏
    .operation_wrapper {
      // background-color: rgb(68, 177, 92);
      padding: 0 10px 0px 10px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      // padding-bottom: 20px;
      border-bottom: 0.1px solid rgba(100, 100, 100, 0.1);
      margin-bottom: 10px;
      .btn_box {
        width: 40px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // background-color: #bfa;
        .img {
          width: 27px;
          height: 27px;
        }
        .text {
          font-size: 10px;
        }
      }
    }
    //相关视频
    .related_video_wrapper {
      padding: 0 10px;
    }
  }
}
</style>

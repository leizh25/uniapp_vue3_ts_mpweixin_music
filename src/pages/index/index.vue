<template>
  <div id="index_wrapper" @touch.stop>
    <!-- 搜索框 -->
    <div @click="clickInput" class="search_wrapper" :style="{ width: systemInfoStore.custom?.left! - 15 + 'px', height: systemInfoStore.navigationBarHeight + 'px', paddingTop: systemInfoStore.statusBarHeight + 'px' }">
      <van-search disabled placeholder="搜索音乐、歌词、MV" @click-input="clickInput" background="opacity" />
    </div>
    <scroll-view scroll-y @refresherrefresh="refresherrefresh" class="index_scroll_view">
      <!-- 轮播图 -->
      <div class="swiper_wrapper">
        <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500" indicator-active-color="#162A78" enable-back-to-top>
          <swiper-item v-for="item in banners" :key="item.bannerId" class="swiper_item" @click="bannerGoPage(item)">
            <img :src="item.pic" style="width: 100%; height: 100%" class="img" />
            <div class="title">{{ item.typeTitle }}</div>
          </swiper-item>
        </swiper>
      </div>
      <!-- 龙舟 -->
      <swiper class="swiper2" :display-multiple-items="indexDataStore.HOMEPAGE_BLOCK_OLD_DRAGON_BALL.creatives?.length && 5">
        <!-- <swiper-item v-for="(item, index) in indexDataStore.HOMEPAGE_BLOCK_OLD_DRAGON_BALL.creatives?.[0].resources" :key="index">
          <div class="item_box" @click="goPage('daily_recommend', 'param')">
            <img :src="item.uiElement.image.imageUrl2" class="img" />
            <div class="text">{{ item.uiElement.mainTitle?.title }}</div>
            <div class="date" v-if="item.uiElement.mainTitle?.title === '每日推荐'">{{ new Date().getDate() }}</div>
          </div>
        </swiper-item> -->
        <swiper-item>
          <div class="item_box" @click="goPage('daily_recommend', 'param')">
            <img src="/static/img/meirituijian.png" class="img" />
            <div class="text">每日推荐</div>
            <div class="date">{{ new Date().getDate() }}</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="item_box" @click="goPage('songlist_square', 'param')">
            <img src="/static/img/gedan.png" class="img" />
            <div class="text">歌单</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="item_box">
            <img src="/static/img/paihangbang.png" class="img" />
            <div class="text">排行榜</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="item_box">
            <img src="/static/img/zhuanji.png" class="img" />
            <div class="text">专辑</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="item_box">
            <img src="/static/img/gengduo.png" class="img" />
            <div class="text">更多</div>
          </div>
        </swiper-item>
      </swiper>

      <!-- 推荐歌单 方形 -->
      <div class="recommend_song_list paddingbottom20">
        <van-cell :border="false">
          <div slot="title">
            <div class="van-cell-text">
              {{ indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.uiElement?.subTitle.title }}
              <van-icon name="arrow" class="custom-icon" />
            </div>
          </div>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet(`${indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.uiElement?.subTitle.title}选项卡`)" />
        </van-cell>
        <scroll-view :scroll-x="true" class="scrollview">
          <!-- <div style="display: inline-block; width: 10px"></div> -->
          <!-- 上下滚动盒子 -->
          <swiper vertical circular autoplay class="scroll_item swiper">
            <swiper-item class="swiper-item" v-for="item in indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.[0].resources" :key="item.resourceId">
              <rectMusicBox :songList="item" :showSlot="true" to="manyousonglist">
                <template><img src="/static/img/infinite.png" style="width: 30px; height: 20px" /></template>
              </rectMusicBox>
            </swiper-item>
          </swiper>
          <!-- 左右滚动盒子 -->
          <div class="scroll_item" v-for="item in indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.creatives?.slice(1, 6)" :key="item.creativeId">
            <rectMusicBox :songList="item.resources![0]" to="songlist"></rectMusicBox>
          </div>
        </scroll-view>
      </div>

      <!-- 风格推荐 -->
      <div class="nice_recommend_song_list paddingbottom20">
        <van-cell :border="false" icon="replay">
          <div slot="title">
            <div class="van-cell-text">{{ indexDataStore.HOMEPAGE_BLOCK_STYLE_RCMD.uiElement?.subTitle.title }}</div>
          </div>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet(`${indexDataStore.HOMEPAGE_BLOCK_STYLE_RCMD.uiElement?.subTitle.title}选项卡`)" />
        </van-cell>
        <swiper class="swiper3" next-margin="50">
          <swiper-item class="swiper_item" v-for="(item, index) in indexDataStore.HOMEPAGE_BLOCK_STYLE_RCMD.creatives" :key="index">
            <longMusicBox v-for="music in item.resources" :music="music" :key="music.resourceId"></longMusicBox>
          </swiper-item>
        </swiper>
      </div>
      <!-- 排行榜 -->
      <!-- <div class="rank_wrapper">
        <van-cell :border="false">
          <view slot="title">
            <view class="van-cell-text">
              排行榜
              <van-icon name="arrow" class="custom-icon" />
            </view>
          </view>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet('排行榜选项卡')" />
        </van-cell>
      </div> -->

      <!-- 热门话题 -->
      <div class="hot_topic_wrapper paddingbottom20">
        <van-cell :border="false">
          <div slot="title">
            <div class="van-cell-text">
              {{ indexDataStore?.HOMEPAGE_BLOCK_HOT_TOPIC.uiElement?.subTitle.title }}
              <van-icon name="arrow" class="custom-icon" />
            </div>
          </div>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet(`${indexDataStore?.HOMEPAGE_BLOCK_HOT_TOPIC.uiElement?.subTitle.title}选项卡`)" />
        </van-cell>
        <scroll-view class="scroll_view" :scroll-x="true">
          <!-- <div class="zhanwei" style="width: 10px;height: 105px;"></div> -->
          <template v-for="obj in indexDataStore.HOMEPAGE_BLOCK_HOT_TOPIC.creatives" :key="obj.creativeId">
            <topicCard v-for="item in obj.resources" :key="item.resourceId" :topic="item"></topicCard>
          </template>
          <!-- <topicCard v-for="item in indexDataStore.HOMEPAGE_BLOCK_HOT_TOPIC.resources[0].resources" :key="item.creativeId" :topic="item"></topicCard> -->
        </scroll-view>
      </div>
    </scroll-view>
    <div class="zhanwei" style="height: 20px"></div>
    <bottomMusicBar></bottomMusicBar>
    <!-- 上弹动作面板 -->
    <van-action-sheet :title="`${showActionTitle}`" :show="showAction" :actions="actions" @close="showAction = false" @select="onSelect" />
    <!-- 顶部通知 -->
    <van-notify id="van-notify" />
    <!-- 当前歌单列表 -->
    <songListSheet></songListSheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import longMusicBox from '@/components/long-music-box.vue'
import rectMusicBox from '@/components/rect-music-box.vue'
import bottomMusicBar from '@/components/bottom-music-bar.vue'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { useIndexDataStore } from '@/stores/indexData'
import topicCard from '@/components/topic-card.vue'
import songListSheet from '@/components/song-list-sheet.vue'
import { reqBanner } from '@/api/index'
import type { BannerResponse, banner } from '@/api/index/type'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
const systemInfoStore = useSystemInfoStore()
const indexDataStore = useIndexDataStore()

// console.log('uni.getSystemInfoSync(): ', uni.getSystemInfoSync())
// 上弹面板开关
const showAction = ref(false)
const showActionTitle = ref('')
//上弹面板选项
const actions = ref([
  {
    name: '优先推荐',
    icon: '/static/img/youxiantuijian.png',
  },
  {
    name: '减少推荐',
    icon: '/static/img/jianshaotuijian.png',
  },
  {
    name: '更多内容',
    icon: '/static/img/gengduo2.png',
  },
])
// 下拉刷新钩子
onPullDownRefresh(async () => {
  try {
    await indexDataStore.init()
    Notify({ type: 'success', message: '刷新成功', safeAreaInsetTop: false, top: systemInfoStore.statusBarHeight })
    uni.stopPullDownRefresh()
  } catch (error) {}
})
const openActionSheet = (str: string) => {
  showAction.value = true
  showActionTitle.value = str
}
//点击上弹面板选项
const onSelect = (e: any) => {
  console.log('onSelect: ', e.detail)
  Notify({
    message: e.detail.name,
    type: 'success',
    top: systemInfoStore.statusBarHeight,
    safeAreaInsetTop: false,
  })
}
//轮播图数据
const banners = ref<banner[]>()
//推荐歌单数据
const recommendSongList = ref([])
//点击首屏输入框
const clickInput = () => {
  //   console.log('clickInput')
  uni.navigateTo({
    url: '/pages/search/search',
  })
}

//获取轮播图数据
const getBanners = async () => {
  try {
    const res: BannerResponse = await reqBanner()
    if (res.code === 200) {
      banners.value = res.banners
    }
  } catch (error) {}
}

//初始化数据
onMounted(async () => {
  // await indexDataStore.init()
  uni.startPullDownRefresh({
    success:() => {
      uni.stopPullDownRefresh()
    },
    fail:() => {
    Notify({ type: 'danger', message: '内容加载失败,请下拉刷新', safeAreaInsetTop: false, top: systemInfoStore.statusBarHeight })
    }
  })
  getBanners()
  // getRecommendSongList()
})
// 页面跳转
const goPage = (pageName: string, param: any) => {
  console.log('跳转页面: ', pageName)
  uni.navigateTo({
    url: `/pages/${pageName}/${pageName}`,
  })
}
// 轮播图跳转
const bannerGoPage = (banner: banner) => {
  // console.log('banner: ', banner)
  // console.log();
  if (banner.song) {
    playingStore.playNextSong(banner.song.id?.toString())
    uni.navigateTo({
      url: `/pages/playing/playing`,
    })
  } else if (banner.url) {
    uni.navigateTo({
      url: `/pages/webview/webview?url=${banner.url}`,
    })
  }
}

//下拉刷新
const refresherrefresh = () => {
  console.log('下拉刷新')
}
</script>

<style lang="less">
#index_wrapper {
  // height: 100vh;
  background-image: linear-gradient(to top, #f8f9fd, rgb(199, 196, 234));
  background-origin: padding-box;
  // padding-top: var(--status-bar-height);
  position: relative;
  padding-bottom: 45px;
  // padding-top: 80px;
  .paddingbottom20 {
    padding-bottom: 20px;
    box-sizing: border-box;
    border-bottom: 0.1px solid rgba(100, 100, 100, 0.1);
  }

  //搜索框
  .search_wrapper {
    // width: 70vw;
    // padding: 10px;
    // padding-top: 5px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .van-search {
      padding: 0;
    }
  }

  .index_scroll_view {
    // height: 1500px;
    // height: v-bind(windowHeight + "px");
    // position: absolute;
    // top: 100px;
    // margin-top: 60px;

    //轮播图
    .swiper_wrapper {
      padding: 10px;

      .swiper {
        width: 100%;
        height: 130px;

        .swiper_item {
          .img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }

          .title {
            color: #fff;
            position: absolute;
            bottom: 6px;
            right: 5px;
            z-index: 999;
            background-color: #ffffff94;
            color: #333;
            font-size: 10px;
            border-radius: 5px;
            padding: 2px 5px;
          }
        }
      }
    }

    //龙舟
    .swiper2 {
      height: 75px;

      .item_box {
        width: 75px;
        height: 75px;
        //   background-color: #bfa;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;

        .img {
          width: 40px;
          height: 40px;
        }

        .text {
          margin-top: 3px;
          font-size: 12px;
        }

        .date {
          position: absolute;
          left: 29px;
          bottom: 35px;
          font-size: 13px;
          font-weight: bold;
          color: #fff;
        }
      }
    }

    //推荐歌单
    .recommend_song_list {
      .van-cell {
        background: none;

        .van-cell-text {
          font-size: 17px;
          font-weight: bold;
        }
      }

      .scrollview {
        // padding-bottom: 5px;
        white-space: nowrap;
        box-sizing: border-box;
        // display: flex;
        // align-items: center;
        height: 155px;
        // overflow: hidden;

        //隐藏滚动条
        ::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
          -webkit-appearance: none;
        }
        .swiper {
          width: 120px;
          height: 120px;
          overflow: hidden;
          float: left;
          margin-left: 10px;
        }

        .scroll_item {
          width: 120px;
          height: 100%;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }

    //系统推荐 风格推荐
    .nice_recommend_song_list {
      .van-cell {
        background: none;

        .van-cell-text {
          font-size: 17px;
          font-weight: bold;
        }
      }

      // .van-cell-text {
      //   font-size: 17px;
      //   font-weight: bold;
      // }
      .swiper3 {
        height: 185px;
      }
    }

    // 热门话题
    .hot_topic_wrapper {
      .van-cell {
        background: none;

        .van-cell-text {
          font-size: 17px;
          font-weight: bold;
        }
      }
      .scroll_view {
        white-space: nowrap;
        height: 105px;
        padding-left: 10px;
        //隐藏滚动条
        ::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
          -webkit-appearance: none;
        }
        .zhanwei {
          float: left;
          overflow: hidden;
        }
      }
    }
    //排行榜
    // .rank_wrapper {
    //   .van-cell {
    //     background: none;

    //     .van-cell-text {
    //       font-size: 17px;
    //       font-weight: bold;
    //     }
    //   }
    // }

    //
  }
}
</style>

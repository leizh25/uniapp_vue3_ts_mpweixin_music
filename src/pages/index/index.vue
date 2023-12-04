<template>
  <div id="index_wrapper" @touch.stop>
    <!-- 搜索框 -->
    <div @click="clickInput" class="search_wrapper" :style="{ height: systemInfoStore.navigationBarHeight + 'px', paddingTop: systemInfoStore.statusBarHeight + 'px' }">
      <van-search disabled placeholder="搜索音乐、歌词、MV、电台" @click-input="clickInput" background="opacity" />
    </div>
    <scroll-view scroll-y @refresherrefresh="refresherrefresh" class="index_scroll_view">
      <!-- 轮播图 -->
      <div class="swiper_wrapper">
        <swiper class="swiper" circular indicator-dots="true" autoplay="true" interval="4000" duration="500" indicator-active-color="#162A78" enable-back-to-top>
          <swiper-item v-for="item in banners" :key="item.id" class="swiper_item" @click="bannerGoPage(item)">
            <img :src="item.pic" style="width: 100%; height: 100%" class="img" />
            <div class="title">{{ item.typeTitle }}</div>
          </swiper-item>
        </swiper>
      </div>
      <!-- 龙舟 -->
      <swiper class="swiper2" :display-multiple-items="indexDataStore.HOMEPAGE_BLOCK_OLD_DRAGON_BALL.length && 5">
        <swiper-item v-for="(item, index) in indexDataStore.HOMEPAGE_BLOCK_OLD_DRAGON_BALL" :key="index">
          <div class="item_box" @click="goPage('daily_recommend', 'param')">
            <img :src="item.imageUrl2" class="img" />
            <div class="text">{{ item.title }}</div>
            <div class="date" v-if="item.title === '每日推荐'">{{ new Date().getDate() }}</div>
          </div>
        </swiper-item>
        <!-- <swiper-item>
          <div class="item_box" @click="goPage('daily_recommend', 'param')">
            <img src="/static/img/meirituijian.png" class="img" />
            <div class="text">每日推荐</div>
            <div class="date">{{ new Date().getDate() }}</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="item_box">
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
        </swiper-item> -->
      </swiper>
      <!-- 推荐歌单 方形 -->
      <div class="recommend_song_list paddingbottom20">
        <van-cell :border="false">
          <view slot="title">
            <view class="van-cell-text">
              推荐歌单
              <van-icon name="arrow" class="custom-icon" />
            </view>
          </view>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet('推荐歌单选项卡')" />
        </van-cell>
        <scroll-view scroll-x="true" class="scrollview">
          <!-- <div style="display: inline-block; width: 10px"></div> -->
          <!-- 上下滚动盒子 -->
          <swiper vertical circular autoplay class="scroll_item swiper">
            <swiper-item class="swiper-item" v-for="item in indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.scroll_playlist?.res" :key="item.resourceId">
              <rectMusicBox :songList="item" :showSlot="true" to="manyousonglist">
                <template><img src="/static/img/infinite.png" style="width: 30px; height: 20px" /></template>
              </rectMusicBox>
            </swiper-item>
          </swiper>
          <!-- 左右滚动盒子 -->
          <div class="scroll_item" v-for="item in indexDataStore.HOMEPAGE_BLOCK_PLAYLIST_RCMD.playlist?.res" :key="item.resourceId">
            <rectMusicBox :songList="item" to="songlist"></rectMusicBox>
          </div>
        </scroll-view>
      </div>
      <!-- 风格推荐 -->
      <div class="nice_recommend_song_list paddingbottom20">
        <van-cell :border="false" icon="replay">
          <view slot="title">
            <view class="van-cell-text">{{ indexDataStore.HOMEPAGE_BLOCK_STYLE_RCMD.title }}</view>
          </view>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet('好听的宝藏歌曲推荐选项卡')" />
        </van-cell>
        <swiper class="swiper3" next-margin="50">
          <swiper-item class="swiper_item" v-for="(item, index) in indexDataStore.HOMEPAGE_BLOCK_STYLE_RCMD.res" :key="index">
            <longMusicBox v-for="music in item" :music="music" :key="music.resourceId"></longMusicBox>
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
          <view slot="title">
            <view class="van-cell-text">
              {{ indexDataStore?.HOMEPAGE_BLOCK_HOT_TOPIC?.title }}
              <van-icon name="arrow" class="custom-icon" />
            </view>
          </view>
          <van-icon slot="right-icon" name="ellipsis" class="custom-icon" size="20px" style="transform: rotateZ(90deg)" @click="openActionSheet('热门话题选项卡')" />
        </van-cell>
        <scroll-view class="scroll_view" scroll-x="true">
          <!-- <div class="zhanwei" style="width: 10px;height: 105px;"></div> -->
          <template v-for="arr in indexDataStore.HOMEPAGE_BLOCK_HOT_TOPIC.resources" :key="arr.creativeId">
            <topicCard v-for="item in arr.resources" :key="item.resourceId" :topic="item"></topicCard>
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

<script setup>
import { request } from '@/utils/request'
import { ref, onMounted } from 'vue'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import longMusicBox from '@/components/long-music-box.vue'
import rectMusicBox from '@/components/rect-music-box.vue'
import bottomMusicBar from '@/components/bottom-music-bar'
import { useSystemInfoStore } from '@/stores/systemInfo.js'
import { useIndexDataStore } from '@/stores/indexData.js'
import topicCard from '@/components/topic-card'
import songListSheet from '@/components/song-list-sheet.vue'
console.log('Notify: ', Notify)
const systemInfoStore = useSystemInfoStore()
const indexDataStore = useIndexDataStore()
// console.log('systemInfoStore: ', systemInfoStore)
// uni.getSystemInfoSync()
console.log('uni.getSystemInfoSync(): ', uni.getSystemInfoSync())
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
const openActionSheet = (str) => {
  showAction.value = true
  showActionTitle.value = str
}
//点击上弹面板选项
const onSelect = (e) => {
  console.log('onSelect: ', e.detail)
  Notify({
    message: e.detail.name,
    type: 'success',
    top: systemInfoStore.statusBarHeight,
  })
}
//轮播图数据
const banners = ref([])
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
  const res = await request({
    url: '/banner?type=2',
  })
  // console.log('res: ', res)
  if (res.code == 200) {
    banners.value = res.banners.map((item) => {
      return {
        pic: item.pic,
        typeTitle: item.typeTitle,
        id: item.bannerId,
        url: item.url,
        song: item.song && {
          name: item.song.name,
          id: item.song.id,
          ar: item.song.ar.map((item) => {
            return { id: item.id, name: item.name }
          }),
        },
      }
    })
    // console.log(banners.value)
  }
}
//获取推荐歌单数据
const getRecommendSongList = async () => {
  const res = await request({
    url: '/personalized',
    data: {
      limit: 6,
    },
  })
  if (res.code === 200) {
    recommendSongList.value = res.result.map((item) => {
      return {
        id: item.id,
        name: item.name,
        picUrl: item.picUrl,
        playCount: item.playCount,
      }
    })
  }
}

//初始化数据
onMounted(() => {
  getBanners()
  getRecommendSongList()
  //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
  let menuButtonObject = uni.getMenuButtonBoundingClientRect()
  uni.getSystemInfo({
    //获取系统信息
    success: (res) => {
      //导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
      // let navHeight = menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2
      // titleBarHeight.value = navHeight
      // statusBarHeight.value = res.statusBarHeight
    },
    fail(err) {
      console.log(err)
    },
  })
})
// 页面跳转
const goPage = (pageName, param) => {
  console.log('跳转页面: ', pageName)
  uni.navigateTo({
    url: `/pages/${pageName}/${pageName}`,
  })
}
// 轮播图跳转
const bannerGoPage = (banner) => {
  // console.log('banner: ', banner)
  // console.log();
  if (banner.song) {
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
    width: 70vw;
    // padding: 10px;
    // padding-top: 5px;
    padding-left: 10px;
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

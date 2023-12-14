<template>
  <div id="search_wrapper">
    <!-- 标题栏 -->
    <van-nav-bar title="搜索" left-text="返回" left-arrow @click-left="goBack" />

    <!-- 搜索框 -->
    <van-search :value="searchValue" :placeholder="placeholder" use-action-slot="true" @change="change">
      <div slot="action" @click="search()">搜索</div>
    </van-search>
    <!-- 搜索建议 -->
    <van-cell-group v-show="showAdvice">
      <van-cell clickable icon="search" v-for="item in searchAdvice?.songs" :key="item.id" :title="item.name + ' ' + item.artists.map((i) => i.name).join('、')" @click="search(item.name)"></van-cell>
      <van-cell clickable icon="search" v-for="item in searchAdvice?.artists" :key="item.id" :title="item.name || '歌手'" @click="search(item.name)"></van-cell>
      <van-cell clickable icon="search" v-for="item in searchAdvice?.albums" :key="item.id" :title="item.name + ' ' + item.artist.name" @click="search(item.name)"></van-cell>
    </van-cell-group>

    <scroll-view class="scroll_view" id="scroller" :scroll-y="true" :style="{ height: searchWrapperHeight + 'px' }" @scroll="onScroll">
      <div class="hot_search_wrapper" v-show="showHotSearch">
        <van-index-anchor index="热搜榜" />
        <van-cell clickable v-for="(item, index) in hotSearchList" :key="index" @click="search(item.first)">
          <template #title>
            <span class="index">{{ index + 1 }}</span>
            <span class="hot_search_title">{{ item.first }}</span>
          </template>
        </van-cell>
      </div>
      <div class="search_result_wrapper" v-show="showSearchResult">
        <van-sticky :scroll-top="scrollTop" :offset-top="offsetTop" class="sticky">
          <van-index-anchor index="搜索结果" />
        </van-sticky>
        <div class="song_wrapper" v-for="item in searchResult?.songs" :key="item.id">
          <div class="left" :style="{ width: `calc(100% - ${item.mvid ? '70px' : '35px'})` }" @click="playSong(item.id)">
            <div class="song_box" :style="{ width: `calc(100% - ${item.mvid ? '70px' : '35px'} - 40px)` }">
              <div class="name van-ellipsis">{{ item.name }}</div>
              <div class="album_box">
                <div class="al_name van-ellipsis">{{ item.artists.map((i) => i.name).join('、') + ' - ' + item.album.name }}</div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="btn video_btn" v-if="item.mvid" @click="playVideo(item)">
              <van-icon name="video-o" size="25" />
            </div>
            <div class="btn menu_btn" @click="openMenu">
              <van-icon name="ellipsis" size="25" style="rotate: 90deg" />
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
    <van-action-sheet :show="showActionSheet" title="标题" @close="closeActionSheet">
      <div>内容</div>
    </van-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqSeachDefault, reqSearchAdvice, reqHotSearchList, reqSearch } from '@/api/search'
import type { Advice, Hot, SearchResponse, SearchResult } from '@/api/search/type'
import { onLoad } from '@dcloudio/uni-app'
import { useSystemInfoStore } from '@/stores/systemInfo'
import { usePlayingStore } from '@/stores/playing'
import type { song } from '@/api/search/type'
let isInput = ref<boolean>(false)
const goBack = () => {
  uni.navigateBack()
}
const searchValue = ref('')
const placeholder = ref('请输入搜索关键词')
const searchAdvice = ref<Advice>()
const hotSearchList = ref<Hot[]>()
const searchWrapperHeight = ref<number>(0)
const searchResult = ref<SearchResult>()
const showAdvice = ref<boolean>(true)
const showHotSearch = ref<boolean>(true)
const showSearchResult = ref<boolean>(false)
const scrollTop = ref<number>(0)
const offsetTop = ref<number>(0)
const showActionSheet = ref<boolean>(false)
onLoad(() => {
  getSearchDefault()
  setHeight()
  getHotSearchList()
})

const setHeight = () => {
  uni
    .createSelectorQuery()
    .select('.hot_search_wrapper')
    .boundingClientRect((res) => {
      console.log(res)
      searchWrapperHeight.value = useSystemInfoStore().windowHeight! - res?.top
    })
    .exec()
}
//获取默认搜索值
const getSearchDefault = async () => {
  const res = await reqSeachDefault()
  if (res.code == 200) {
    placeholder.value = res.data.showKeyword
  }
}
//点击搜索按钮
const search = async (key?: string) => {
  // console.log('search')
  if (!!key) {
    //有值
    // console.log(key)
    const res: SearchResponse = await reqSearch(key)
    if (res.code == 200) {
      showAdvice.value = false
      showHotSearch.value = false
      showSearchResult.value = true
      searchResult.value = res.result
    }
  } else {
    //无值
    search(placeholder.value)
  }
}
//获取搜索建议
const getAdvice = async (str: string) => {
  const res = await reqSearchAdvice(str)
  if (res.code == 200) {
    searchAdvice.value = res.result
    showAdvice.value = true
    showHotSearch.value = false
    showSearchResult.value = false
  }
}
//输入框内容改变
let timer = null
const change = (e: any) => {
  searchValue.value = e.detail
  if (e.detail.trim() == '') {
    searchAdvice.value = {}
    searchResult.value = {}
    showHotSearch.value = true
    showAdvice.value = false
    return
  }
  if (isInput.value) return
  isInput.value = true
  getAdvice(e.detail)
  timer = setTimeout(() => {
    isInput.value = false
    timer = null
  }, 500)
}

//获取热搜列表
const getHotSearchList = async () => {
  const res = await reqHotSearchList()
  if (res.code == 200) {
    hotSearchList.value = res.result.hots
  }
}

const onScroll = (event: any) => {
  uni
    .createSelectorQuery()
    .select('#scroller')
    .boundingClientRect((res) => {
      scrollTop.value = event.detail.scrollTop
      offsetTop.value = res?.top || 0
    })
    .exec()
}

const playSong = (id: number) => {
  usePlayingStore().playNextSong(id.toString())
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const playVideo = (song: song) => {
  uni.navigateTo({
    url: `/pages/playingvideo/playingvideo?songId=${song.id}&mvid=${song.mvid}`,
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
#search_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;

  // 搜索框
  .van-search {
    padding: 0 12px;
    box-sizing: border-box;
    .van-search__content {
      padding-right: 10px;
    }
    .van-search__action {
      padding: 0 10px;
      background-color: #eee;
    }
  }

  .active {
    background-color: #bfa;
  }

  .scroll_view {
    .hot_search_wrapper {
      padding-top: 20px;

      .index {
        display: inline-block;
        width: 40px;
        text-align: center;
      }
    }
    .search_result_wrapper {
      height: 100%;
      .van-sticky-wrap {
        background-color: #bfa;
      }
      // 搜索结果
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
}
</style>

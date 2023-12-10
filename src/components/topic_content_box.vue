<template>
  <div class="topic_content_wrapper van-hairline--bottom">
    <div class="creater_wrapper">
      <img :src="comment.user.avatarUrl" class="img" lazy-load/>
      <div class="creater_info">
        <div class="top">
          <span class="nickname">{{ comment.user.nickname }}</span>
          <span class="share_tip"  v-if="!!commentJSON.song">分享单曲:</span>
        </div>
        <div class="time_box">
          <span class="text">{{ timestampToDate(comment.eventTime) }}</span>
        </div>
      </div>
    </div>
    <div class="content_wrapper">
      <div class="text_box">{{ commentJSON.msg?.replaceAll(/#[^#]+#/g, '') }}</div>
      <div class="link_wrapper">
        <span class="link_box" v-for="(item, index) in keyTags" :key="index" @click="goWebview(comment.bottomActivityInfos[0].h5Target)">{{ item }}</span>
      </div>
      <div class="img_wrapper">
        <van-uploader preview-size="140px" :file-list="fileList" :show-upload="false" :deletable="false" />
      </div>
      <div class="song_wrapper" v-if="!!commentJSON.song" @click="playSong(commentJSON.song?.id)">
        <div class="img_box">
          <img :src="commentJSON.song?.album.picUrl" class="img" lazy-load />
          <van-icon class="icon" name="play" size="20" />
        </div>
        <div class="song">
          <div class="name van-ellipsis">{{ commentJSON.song?.name }}</div>
          <div class="artist">{{ commentJSON.song?.artists.map((item: any) => item.name).join('、') }}</div>
        </div>
      </div>
      <div class="operation_wrapper">
        <div class="operation_box">
          <div class="share_box btn">
            <van-icon name="share-o" size="18" />
            <span class="text">{{ comment.xInfo.info.shareCount }}</span>
          </div>
          <div class="comment_box btn">
            <van-icon name="chat-o" size="18" />
            <span class="text">{{ comment.xInfo.info.commentCount }}</span>
          </div>
          <div class="liked_box btn">
            <van-icon name="good-job-o" size="18" />
            <span class="text">{{ comment.xInfo.info.likedCount }}</span>
          </div>
        </div>
        <div class="menu_btn">
          <van-icon name="ellipsis" size="18" style="rotate: 90deg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { event } from '@/api/topic/type'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { usePlayingStore } from '@/stores/playing'
const playingStore = usePlayingStore()
const props = defineProps<{
  comment: event
}>()
const commentJSON = ref<any>({})
const fileList = ref<any>([])
const keyTags = ref<string[]>([])
onMounted(() => {
  commentJSON.value = JSON.parse(props.comment.json)
  //   console.log('commentJSON.value: ', commentJSON.value)
  fileList.value = props.comment.pics.map((item, index) => {
    return {
      url: item.rectangleUrl,
      name: index,
    }
  })
  //   console.log('fileList.value: ', fileList.value)
  keyTags.value = extractHashtags(commentJSON.value.msg)
  // console.log('keyTags.value: ', keyTags.value);
})
const timestampToDate = (timestamp: number) => {
  var date = new Date(timestamp)

  //   var year = date.getFullYear()
  var month = date.getMonth() + 1 // getMonth() 方法返回的月份从0开始，因此需要加1
  var day = date.getDate()

  return `${month}月${day}日`
}
const extractHashtags = (text: string) => {
  const hashtagRegex = /#[^#]+#/g // 正则表达式匹配 # 后面的单词字符
  const hashtags = text.match(hashtagRegex) // 使用 match 方法找到所有匹配的字符串
  return hashtags ? hashtags.map((tag) => `${tag}`) : [] // 如果找到匹配，返回新的字符串数组，否则返回空数组
}

const playSong = (id: number) => {
  playingStore.playNextSong(id.toString())
  uni.navigateTo({
    url: '/pages/playing/playing',
  })
}
const goWebview = (url: string) => {
  console.log('url: ', url)
  uni.navigateTo({
    url: '/pages/webview/webview?url=' + encodeURIComponent(url),
  })
}
</script>
<style lang="less" scoped>
// 话题内容
.topic_content_wrapper {
  padding: 15px 10px;
  //   background-color: chartreuse;
  background-color: #fff;
  .creater_wrapper {
    height: 40px;
    display: flex;
    align-items: center;
    .img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      //   background-color: purple;
    }
    .creater_info {
      margin-left: 10px;
      //   background-color: peru;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .top {
        font-size: 15px;
        .nickname {
          font-weight: bold;
        }
        .share_tip {
          color: #999;
          margin-left: 3px;
          font-size: 14px;
        }
      }
      .time_box {
        width: 100%;
        text-align: left;
        .text {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
  .content_wrapper {
    margin-top: 10px;
    padding-left: 44px;
    box-sizing: border-box;
    font-size: 15px;
    .text_box {
      letter-spacing: 0.05em;
      line-height: 25px;
    }
    .link_wrapper {
      .link_box {
        margin-top: 10px;
        box-sizing: border-box;
        color: blue;
      }
    }
    // .img_wrapper {
    //   background-color: coral;

    // }
    .song_wrapper {
      height: 45px;
      padding: 0 7px;
      background-color: #f3f3f3;
      border-radius: 8px;
      display: flex;
      align-items: center;
      .img_box {
        width: 35px;
        height: 35px;
        border-radius: 5px;
        overflow: hidden;
        // background-color: aquamarine;
        position: relative;
        .img {
          width: 100%;
          height: 100%;
          background-color: aqua;
        }
        .icon {
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      .song {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .artist {
          font-size: 11px;
          color: #999;
        }
      }
    }
    .operation_wrapper {
      height: 40px;
      margin-top: 7px;
      box-sizing: border-box;
      //   background-color: cadetblue;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .operation_box {
        width: 200px;
        display: flex;
        justify-content: space-between;
        color: #666;
        .btn {
          .text {
            margin-left: 2px;
          }
        }
      }
      .menu_btn {
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        // background-color: chocolate;
      }
    }
  }
}
</style>

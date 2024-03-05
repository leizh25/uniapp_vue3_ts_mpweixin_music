<template>
  <div id="me_app">
    <!-- 登录页 -->
    <div class="go_login_button" v-if="!isLogin">
      <van-button type="primary" block round color="#13227a" @click="goLogin">去登录</van-button>
    </div>
    <!-- 个人信息 -->
    <div class="info_wrapper" v-if="isLogin">
      <div class="avatar_box">
        <div class="avatar"><img :src="userStore.userinfo.profile.avatarUrl" style="width: 100%; height: 100%" /></div>
      </div>
      <div class="info_box">
        <div class="nickname">
          <span class="name">{{ userStore.userinfo.profile.nickname }}</span>
          <div class="vip">
            <img src="/static/img/vip.png" style="width: 100%; height: 100%" v-if="!userStore.userinfo.profile.vipType" />
            <img src="/static/img/vip-true.png" style="width: 100%; height: 100%" v-else />
          </div>
        </div>
        <div class="concern_box">
          <span class="text">{{ userStore.userinfo.profile.follows }} 关注</span>
          <span class="text">{{ userStore.userinfo.profile.followeds }} 粉丝</span>
          <span class="text">Lv.0</span>
        </div>
      </div>
    </div>
    <div class="tool_wrapper">
      <div class="tool_box">
        <img class="img" src="/static/img/zuijinbofang.png" alt="" />
        <span class="text">最近播放</span>
      </div>
      <div class="tool_box">
        <img class="img" src="/static/img/yunpan.png" alt="" />
        <span class="text">云盘</span>
      </div>
      <div class="tool_box">
        <img class="img" src="/static/img/shoucang.png" alt="" />
        <span class="text">最近播放</span>
      </div>
      <div class="tool_box">
        <img class="img" src="/static/img/gengduo.png" alt="" />
        <span class="text">更多</span>
      </div>
    </div>
    <div class="my_like_wrapper" @click="goLike">
      <img src="/static/img/wodexihuan.png" class="img" />
      <div class="desc">
        <span class="text">我喜欢的音乐</span>
        <span class="text">0首</span>
      </div>
    </div>
    <BottomMusicBar></BottomMusicBar>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { onShow } from '@dcloudio/uni-app'
import BottomMusicBar from '@/components/bottom-music-bar.vue'

//用户信息
const userStore = useUserStore()

//是否登录状态
const isLogin = ref(false)
//跳转登录的回调
const goLogin = () => uni.navigateTo({ url: '/pages/login/login' })

//初始化方法
//
onMounted(() => {
  isLogin.value = JSON.stringify(userStore.userinfo) != '{}'
  console.log()
})
onShow(() => {
  console.log('me onShow')
  isLogin.value = JSON.stringify(userStore.userinfo) != '{}'
  console.log('isLogin.value: ', isLogin.value)
})
//跳转喜欢的音乐
const goLike = () => {
  uni.navigateTo({
    url: '/pages/like/like'
  })
}
</script>

<style lang="less">
#me_app {
  height: 100vh;
  //   padding: 10px;
  box-sizing: border-box;
  // padding-top: 30px;
  //   padding-top: var(--status-bar-height);
  background-color: #eee;

  .go_login_button {
    height: 220px;
    // background-image: url('/static/img/me_bg.webp');
    // background-image: url('/static/img/movie2.webp');
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    // align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
  }

  //个人信息
  .info_wrapper {
    width: 100%;
    height: 220px;
    padding: 0 10px;
    box-sizing: border-box;
    // background-color: #bfa;

    .avatar_box {
      display: flex;
      justify-content: center;

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        background-color: aqua;
        transform: translateY(30px);
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
      }
    }

    .info_box {
      // height: 100px;
      background-color: #eee;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.5);
      padding: 20px;
      padding-top: 40px;
      border-radius: 10px;
      // padding-top: 40px;
      box-sizing: border-box;
      background-color: #13227a;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;

      .nickname {
        display: flex;
        justify-content: center;

        .name {
          color: #eee;
          font-size: 20px;
          margin-right: 10px;
          margin-bottom: 20px;
        }

        .vip {
          width: 30px;
          height: 20px;
          //   background-image: url('/static/img/vip-true.png');
          background-size: contain;
          background-repeat: no-repeat;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .concern_box {
        color: #eee;
        .text {
          font-size: 15px;
          margin-right: 10px;
        }
      }
    }
  }
  //工具
  .tool_wrapper {
    // background-color: chocolate;
    background-color: #fff;
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 0 15px;
    box-sizing: border-box;
    margin: 0 10px;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .tool_box {
      width: 80px;
      height: 80px;
      //   background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img {
        width: 35px;
        height: 35px;
        margin-bottom: 5px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  //我的喜欢音乐
  .my_like_wrapper {
    background-color: #fff;
    box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    padding: 0 15px;
    box-sizing: border-box;
    margin: 0 10px;
    height: 80px;
    display: flex;
    align-items: center;
    .img {
      width: 50px;
      height: 50px;
    }
    .desc {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      .text {
        font-size: 16px;
        &:nth-child(2) {
          color: #999;
          font-size: 14px;
          margin-top: 3px;
        }
      }
    }
  }
}
</style>

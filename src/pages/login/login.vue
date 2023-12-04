<template>
  <div class="login_wrapper">
    <div class="tab_wrapper">
      <van-tabs @change="change" animated>
        <van-tab title="验证码">
          <van-row>
            <van-col span="24">
              <van-field placeholder="手机号" label="手机号" name="手机号" type="number" clearable v-model:value="uphone" style="text-align: center" :error-message="phoneErrMsg" @input="(e) => (uphone = e.detail.trim())" />
            </van-col>
          </van-row>
          <van-cell-group>
            <van-field v-model:value="sms" center clearable label="短信验证码" name="短信验证码" type="number" placeholder="请输入短信验证码" use-button-slot @blur="(e) => (sms = e.detail.value.trim())" :error-message="smsErrMsg">
              <van-button slot="button" size="small" type="primary" @click="sendSms" :disabled="disableSms">发送验证码</van-button>
            </van-field>
          </van-cell-group>
          <!-- <div class="sms_tip">{{ disableSms ? smsCount + 's后可重发' : '' }}</div> -->
        </van-tab>
        <van-tab title="密码">
          <van-row>
            <van-col span="24">
              <van-field placeholder="请输入账号" label="手机号" name="用户名" v-model:value="uphone" style="text-align: center" clearable :error-message="phoneErrMsg" @blur="(e) => (uphone = e.detail.value.trim())" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <van-field placeholder="请输入密码" label="密码" name="密码" v-model:value="upass" style="text-align: center" :type="showUpass ? 'text' : 'password'" :error-message="upassErrMsg" @blur="(e) => (upass = e.detail.value.trim())">
                <div slot="right-icon" @click="changeShowUpass">
                  <van-icon name="eye-o" v-show="showUpass" />
                  <van-icon name="closed-eye" v-show="!showUpass" />
                </div>
              </van-field>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="邮箱">
          <van-row>
            <van-col span="24">
              <van-field placeholder="请输入用邮箱" label="邮箱" name="邮箱" v-model:value="uemail" style="text-align: center" :error-message="uemailErrMsg" @blur="(e) => (uemail = e.detail.value.trim())" />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="24">
              <van-field placeholder="请输入密码" label="密码" name="密码" v-model:value="upass" style="text-align: center" :type="showUpass ? 'text' : 'password'" :error-message="upassErrMsg" @blur="(e) => (upass = e.detail.value.trim())">
                <div slot="right-icon" @click="changeShowUpass">
                  <van-icon name="eye-o" v-show="showUpass" />
                  <van-icon name="closed-eye" v-show="!showUpass" />
                </div>
              </van-field>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
    <div class="btn_box">
      <van-button type="primary" block round color="#13227a" @click="login">{{ tabIdx == 0 ? '登录 / 注册' : '登录' }}</van-button>
    </div>
    <van-notify id="van-notify" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { request } from '@/utils/request'
import Notify from '@/wxcomponents/@vant/weapp/notify/notify'
import { useUserStore } from '@/stores/user'
import { useSystemInfoStore } from '@/stores/systemInfo.js'
const userStore = useUserStore()
const systemInfoStore = useSystemInfoStore()
const { statusBarHeight } = systemInfoStore

//tab索引
const tabIdx = ref(0)
//用户输入框
const upass = ref('')
const uemail = ref('')
const uphone = ref('13207075356')
const sms = ref('')
//错误提示
const phoneErrMsg = ref('')
const smsErrMsg = ref('')
const upassErrMsg = ref('')
const uemailErrMsg = ref('')
//显示密码
const showUpass = ref(false)
//禁用发送短信按钮
const disableSms = ref(false)
//短信倒计时
const smsCount = ref(60)
//定时器
let timer1 = null
let timer2 = null
//标签页改变回调
const change = (e) => {
  // console.log(e.detail.index);
  tabIdx.value = e.detail.index
  upass.value = ''
  // uemail.value = ''
  // uphone.value = ''
  sms.value = ''
  phoneErrMsg.value = ''
  smsErrMsg.value = ''
  upassErrMsg.value = ''
  uemailErrMsg.value = ''
}
//发送验证码
const sendSms = async () => {
  try {
    await validate({ smsFlag: false })
    console.log('发送验证码')
    const res = await request({
      url: '/captcha/sent',
      data: {
        phone: uphone.value,
      },
    })
    console.log('res: ', typeof res, res)
    if (res.code == 200) {
      Notify({ type: 'success', message: '验证码发送成功，如未收到,60s后可重发', top: statusBarHeight })
      disableSms.value = true
      timer1 = setTimeout(() => {
        disableSms.value = false
        clearTimeout(timer1)
        timer1 = null
      }, 60000)
      timer2 = setInterval(() => {
        smsCount.value--
        console.log('smsCount.value: ', smsCount.value)
        if (smsCount.value == 0) {
          clearInterval(timer2)
          timer2 = null
          smsCount.value = 60
          disableSms.value = false
        }
      }, 1000)
    } else {
      Notify({ message: res.message || '错误1', top: statusBarHeight })
    }
  } catch (e) {
    //TODO handle the exception
    console.log(e)
    Notify({ message: e || '错误2', top: statusBarHeight })
  }
}
//登录函数
const login = async () => {
  //表单校验
  try {
    await validate({ smsFlag: true })
  } catch (e) {
    Notify({ message: e || '错误', top: statusBarHeight })
    return
  }
  //登录逻辑
  try {
    //验证码登录
    if (tabIdx.value == 0) {
      //验证验证码是否有误
      const res1 = await request({
        url: '/captcha/verify',
        data: {
          phone: uphone.value,
          captcha: sms.value,
        },
      })
      console.log('验证验证码：', res1)
      if (res1.code !== 200) {
        Notify({ message: res1.message, top: statusBarHeight })
        throw new Error(res1.message)
      }
      //验证码成功
      const res2 = await userStore.login(1, {
        phone: uphone.value,
        captcha: sms.value,
      })
    } else if (tabIdx.value == 1) {
      //账号登录
      // console.log(uphone.value)
      // console.log(upass.value)
      const res = await userStore.login(1, {
        phone: uphone.value,
        password: upass.value,
      })
    } else if (tabIdx.value == 2) {
      //邮箱登录
      const res = await userStore.login(2, {
        email: uemail.value,
        password: upass.value,
      })
    }
    //登录成功，跳转我的页面
    uni.switchTab({
      url: '/pages/me/me',
    })
  } catch (e) {
    // console.log('e: ', e)
    Notify({ message: e.message || '错误', top: statusBarHeight })
    // console.log('验证失败')
  }
}
//密码框可视化切换
const changeShowUpass = () => {
  showUpass.value = !showUpass.value
}
//正则校验函数
const validate = ({ smsFlag = true }) => {
  return new Promise((resolve, reject) => {
    const phoneReg = /^1[3-9]\d{9}$/
    //验证码登录验证
    if (tabIdx.value == '0') {
      if (phoneReg.test(uphone.value.trim())) {
        phoneErrMsg.value = ''
      } else {
        phoneErrMsg.value = '手机号格式错误'
        reject('手机号格式错误')
      }
      if (smsFlag) {
        if (sms.value.trim().length !== 4 || isNaN(sms.value.trim())) {
          smsErrMsg.value = '验证码格式错误'
          reject('验证码格式错误')
        } else {
          smsErrMsg.value = ''
        }
      }
    }
    //账号登录验证
    if (tabIdx.value == 1) {
      if (phoneReg.test(uphone.value.trim())) {
        phoneErrMsg.value = ''
      } else {
        phoneErrMsg.value = '手机号格式错误'
        reject('用户名格式错误')
      }
      if (upass.value.trim().length < 6 || upass.value.trim().length >= 16) {
        upassErrMsg.value = '密码格式错误'
        reject('密码格式错误')
      } else {
        upassErrMsg.value = ''
      }
    }
    //邮箱登录验证
    if (tabIdx.value == 2) {
      const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/
      if (!emailReg.test(uemail.value.trim())) {
        uemailErrMsg.value = '邮箱格式错误'
        reject('邮箱格式错误')
      } else {
        uemailErrMsg.value = ''
      }
      if (upass.value.trim().length <= 6 || upass.value.trim().length >= 16) {
        upassErrMsg.value = '密码格式错误'
        reject('密码格式错误')
      } else {
        upassErrMsg.value = ''
      }
    }
    //执行返回
    resolve(true)
  })
}
</script>

<style lang="less">
.login_wrapper {
  // padding: 10px;
  // padding-top: 25%;
  // background-color: #eee;

  .tab_wrapper {
    height: 180px;
  }

  .btn_box {
    padding: 10px;
  }
  .sms_tip {
    color: #f00;
    text-align: right;
    padding-right: 10px;
  }
}
</style>

import type { song } from '@/api/index/type'
import type { SongDetailResponse } from '@/api/playing/type'
import type { SonglistDetailResponse } from '@/api/songlist/type'
// playing仓库类型定义
export interface PlayingStore {
  playingId: number | string //当前播放音乐的ID
  paramPlayingId: string //传参过来的音乐ID
  playingIndex: number //当前播放歌曲在列表中的索引
  playingMode: 'random' | 'order' | 'circle'
  playingSongInfo: song //当前播放音乐的信息
  playingSongIdList: string[] //当前播放的音乐信息
  playingSongList: song[] //当前播放列表 包括歌曲信息
  prevSongList: song[] //历史播放列表
  playingSongUrl: string //音乐播放地址
  isPlaying: boolean //是否正在播放
  bgAudioManager: any //全局唯一的背景音频管理器
  currentTime: number //当前播放时间
  validDuration: number //真实获取到可播放的时长
  validProgress: number //真实获取到可播放的进度
  isShowLyricsTip: boolean //是否显示左划歌词提示
  //歌词
  processedLrc: {
    songId: number //当前音乐ID
    lrcText: {} //当前音乐歌词
  }
  lrcScrollTop: number //歌词滚动条滚动的距离
  lrcScrolledCount: number //已播放过的歌词的数量
  progressPercent: number //播放进度百分比
  isShowSongListSheet: boolean //是否展示歌单列表
}
/**
 * 歌单仓库
 */
export interface SonglistStore {
  playlist?: SongDetailResponse
  songlistDetailRes: SonglistDetailResponse[] //歌单相应
  songlistIds: string[] //歌单id
}

export interface SystemInfoStore {
  statusBarHeight?: number
  custom?: {
    bottom?: number
    height?: number
    left?: number
    right?: number
    top?: number
    width?: number
  }
  navigationBarHeight?: number
  navHeight?: number
  windowHeight?: number
  safeAreaInsets?: {
    bottom?: number
    left?: number
    right?: number
    top?: number
  }
  safeArea?: {
    bottom?: number
    height?: number
    left?: number
    right?: number
    top?: number
    width?: number
  }
}

/* 
SDKVersion: '3.2.3'
  appId: '__UNI__782BBF6'
  appLanguage: 'zh-Hans'
  appName: 'uni-vue3-mpweixin-thundermusic'
  appVersion: '1.0.0'
  appVersionCode: '100'
  batteryLevel: 100
  benchmarkLevel: 1
  bluetoothEnabled: true
  brand: 'devtools'
  browserName: undefined
  browserVersion: undefined
  cameraAuthorized: true
  deviceBrand: 'devtools'
  deviceId: '17016693299498663171'
  deviceModel: 'iPhone X'
  deviceOrientation: 'portrait'
  devicePixelRatio: 3
  deviceType: 'phone'
  enableDebug: false
  fontSizeSetting: 16
  host: {
    env: 'WeChat'
  }
  hostFontSizeSetting: 16
  hostLanguage: 'zh-CN'
  hostName: 'WeChat'
  hostPackageName: undefined
  hostSDKVersion: '3.2.3'
  hostTheme: undefined
  hostVersion: '8.0.5'
  language: 'zh_CN'
  locationAuthorized: true
  locationEnabled: true
  microphoneAuthorized: true
  mode: 'default'
  model: 'iPhone X'
  notificationAuthorized: true
  osLanguage: undefined
  osName: 'ios'
  osTheme: undefined
  osVersion: '10.0.1'
  pixelRatio: 3
  platform: 'devtools'
  safeArea: {
    bottom: 778
    height: 734
    left: 0
    right: 375
    top: 44
    width: 375
  }
  safeAreaInsets: {
    bottom: 34
    left: 0
    right: 0
    top: 44
  }
  screenHeight: 812
  screenWidth: 375
  statusBarHeight: 44
  system: 'iOS 10.0.1'
  ua: undefined
  uniCompileVersion: '3.8.12'
  uniPlatform: 'mp-weixin'
  uniRuntimeVersion: '3.8.12'
  version: '8.0.5'
  wifiEnabled: true
  windowBottom: 0
  windowHeight: 730
  windowTop: 0
  windowWidth: 375

*/

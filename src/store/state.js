const state = {
  /* 主题颜色 */
  theme: localStorage.getItem("theme") ? JSON.parse(localStorage.getItem("theme")) : 'light',
  logo: localStorage.getItem("logo") ? JSON.parse(localStorage.getItem("logo")) : '@/assets/images/logo-light.png',
  /* 登录 */
  isLogin: localStorage.getItem("isLogin") ? JSON.parse(localStorage.getItem("isLogin")) : false,
  // 用户信息 如果缓存中有就取出来，没有则为空
  userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,

  /* 播放音乐 */
  // 播放状态
  isPlaying: false,
  // 当前歌曲URL
  songUrl: localStorage.getItem('songUrl') ? JSON.parse(localStorage.getItem('songUrl')) : '',
  // 当前歌曲的详情
  nowSongDetail: localStorage.getItem("nowSongDetail") ? JSON.parse(localStorage.getItem("nowSongDetail")) : {},
  // 正在播放列表
  playingList: localStorage.getItem("playingList") ? JSON.parse(localStorage.getItem("playingList")) : [],
  // 历史播放列表
  historyPlay: localStorage.getItem("historyPlay") ? JSON.parse(localStorage.getItem("historyPlay")) : [],
  // 当前歌曲播放的实时秒数
  currentSecond: localStorage.getItem("currentSecond") ? JSON.parse(localStorage.getItem("currentSecond")) : 0,
  // audio标签
  audio: null
}

export default state
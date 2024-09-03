/* 主题 */
export const theme = state => state.theme
export const logo = state => state.logo;
// 用户信息
export const isLogin = state => state.isLogin;
export const userInfo = state => state.userInfo
/* 音乐播放 */
// 播放状态
export const isPlaying = state => state.isPlaying;
// 当前歌曲Url
export const songUrl = state => state.songUrl;
// 当前歌曲详情
export const nowSongDetail = state => state.nowSongDetail
// 正在播放列表
export const playingList = state => state.playingList;
// 历史播放列表
export const historyPlay = state => state.historyPlay;
// 当前歌曲播放实时秒数
export const currentSecond = state => state.currentSecond
// audio标签
export const audio = state => state.audio
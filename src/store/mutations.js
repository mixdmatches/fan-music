const mutations = {
  /* 更改主题 */
  changeTheme(state, payload) {
    state.theme = payload
    localStorage.setItem('theme', JSON.stringify(state.theme))
  },
  changeLogo(state, payload) {
    state.logo = payload
    localStorage.setItem('logo', JSON.stringify(state.logo))
  },
  // 更新登录状态
  updateLogin(state, payload) {
    state.isLogin = payload
    localStorage.setItem('isLogin', JSON.stringify(state.isLogin))
  },
  // 保存用户信息
  saveUserInfo(state, payload) {
    state.userInfo = payload
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  /* 音乐播放 */
  // 改变音乐播放状态
  changePlayState(state, payload) {
    state.isPlaying = payload
  },
  // 保存歌曲URL
  saveSongUrl(state, payload) {
    state.songUrl = payload
    localStorage.setItem('songUrl', JSON.stringify(state.songUrl))
  },
  // 保存当前歌曲播放详情
  saveSongDetail(state, payload) {
    state.nowSongDetail = payload
    localStorage.setItem("nowSongDetail", JSON.stringify(state.nowSongDetail))
    // 添加当前播放歌曲到播放历史记录
    let index = state.historyPlay.findIndex(item => {
      return item.id === payload.id
    })
    // 历史播放记录中没有这首歌
    if (index === -1) {
      state.historyPlay.unshift(payload)
      localStorage.setItem("historyPlay", JSON.stringify(state.historyPlay))
    }
  },
  // 添加单个音乐到播放列表
  addPlayinglist(state, song) {
    // 移除所有重复元素
    state.playingList = state.playingList.filter((item) => item.id !== song.id)
    // 添加
    state.playingList.unshift(song);
    // 重新赋值
    localStorage.setItem("playingList", JSON.stringify(state.playingList));
  },
  // 点击播放全部,添加当前歌单所有歌曲到播放列表
  addAllSong(state, payload) {
    state.playingList = payload;
    localStorage.setItem("playingList", JSON.stringify(state.playingList))
  },
  // 清空列表
  clearSongList(state) {
    state.playingList = []
    state.songUrl = "";
    state.nowSongDetail = {};
    localStorage.removeItem("playingList");
    localStorage.removeItem("songUrl");
    localStorage.removeItem("nowSongDetail");
  },
  // 保存当前歌曲播放的实时秒数
  saveCurrentSeconds(state, payload) {
    state.currentSecond = payload;
    localStorage.setItem("currentSecond", JSON.stringify(state.currentSecond));
  },
  // 保存audio标签
  saveAudio(state, payload) {
    state.audio = payload
  }

}
export default mutations
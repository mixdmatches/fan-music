const actions = {
  // 主题切换
  changeTheme({ commit }, payload) {
    commit('changeTheme', payload)
  },
  changeLogo({ commit }, payload) {
    commit('changeLogo', payload)
  },
  // 更新登陆状态
  // commit是从status里解构出来的
  updateLogin({ commit }, payload) {
    commit("updateLogin", payload)
  },
  // 保存用户信息
  saveUserInfo({ commit }, payload) {
    commit("saveUserInfo", payload)
  },
  /* 音乐播放 */
  // 改变音乐状态
  changePlayState({ commit }, payload) {
    commit("changePlayState", payload)
  },
  // 保存歌曲Url
  saveSongUrl({ commit }, payload) {
    commit("saveSongUrl", payload)
  },
  // 保存当前歌曲播放详情
  saveSongDetail({ commit }, payload) {
    commit("saveSongDetail", payload)
  },
  // 添加单个音乐到播放列表
  addPlayinglist({ commit }, song) {
    commit('addPlayinglist', song)
  },
  // 点击播放全部,添加当前歌单所有歌曲到播放列表
  addAllSong({ commit }, payload) {
    commit("addAllSong", payload)
  },
  // 清空列表
  clearSongList({ commit }) {
    commit('clearSongList')
  },
  // 保存当前歌曲播放的实时秒数
  saveCurrentSeconds({ commit }, payload) {
    commit("saveCurrentSeconds", payload)
  },
  // 保存audio
  saveAudio(state, payload) {
    state.audio = payload
  }
}
export default actions
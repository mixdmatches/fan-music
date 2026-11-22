import { defineStore } from 'pinia'

// 安全读取 localStorage 中的 JSON，解析失败时返回默认值
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// 音乐播放相关状态
export const usePlayerStore = defineStore('player', {
  state: () => ({
    isPlaying: false,
    songUrl: read('songUrl', ''),
    nowSongDetail: read('nowSongDetail', {}),
    playingList: read('playingList', []),
    historyPlay: read('historyPlay', []),
    currentSecond: read('currentSecond', 0),
    audio: null
  }),
  actions: {
    // 改变播放状态
    changePlayState(state) {
      this.isPlaying = state
    },
    // 保存歌曲 URL
    saveSongUrl(url) {
      this.songUrl = url
      localStorage.setItem('songUrl', JSON.stringify(url))
    },
    // 保存当前歌曲详情，并写入历史记录
    saveSongDetail(song) {
      this.nowSongDetail = song
      localStorage.setItem('nowSongDetail', JSON.stringify(song))
      const exists = this.historyPlay.some((item) => item.id === song.id)
      if (!exists) {
        this.historyPlay.unshift(song)
        localStorage.setItem('historyPlay', JSON.stringify(this.historyPlay))
      }
    },
    // 添加单首歌曲到播放列表（重复则置顶）
    addPlayinglist(song) {
      this.playingList = this.playingList.filter((item) => item.id !== song.id)
      this.playingList.unshift(song)
      localStorage.setItem('playingList', JSON.stringify(this.playingList))
    },
    // 播放全部：整体替换播放列表
    addAllSong(list) {
      this.playingList = list
      localStorage.setItem('playingList', JSON.stringify(this.playingList))
    },
    // 清空播放列表
    clearSongList() {
      this.playingList = []
      this.songUrl = ''
      this.nowSongDetail = {}
      localStorage.removeItem('playingList')
      localStorage.removeItem('songUrl')
      localStorage.removeItem('nowSongDetail')
    },
    // 保存实时播放秒数
    saveCurrentSeconds(second) {
      this.currentSecond = second
      localStorage.setItem('currentSecond', JSON.stringify(second))
    },
    // 保存 audio 元素
    saveAudio(audio) {
      this.audio = audio
    }
  }
})

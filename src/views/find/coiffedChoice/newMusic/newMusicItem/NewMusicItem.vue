<template>
  <!-- 单首歌 -->
  <div
    class="n-item"
    @mouseover="
      isMouseMove = true;
      currentIndex = newSongItem.id;
    "
    @mouseout="isMouseMove = false"
  >
    <div class="song">
      <img v-lazy="newSongItem.picUrl" alt="" />

      <!-- 遮罩层 -->
      <span
        class="shadow"
        v-show="isMouseMove && currentIndex === newSongItem.id"
      ></span>

      <!-- 播放 -->
      <span
        class="play"
        @click.stop="playClick(newSongItem)"
        @click="playMusic"
        v-show="!isPlayItem && isMouseMove && currentIndex === newSongItem.id"
      >
        <i class="bi bi-play-fill"></i>
      </span>
      <!-- 暂停 -->
      <span
        class="play"
        @click="pauseMusic"
        v-show="isPlayItem && isMouseMove && currentIndex === newSongItem.id"
      >
        <i class="bi bi-pause"></i>
      </span>
      <span class="songInfo">
        <p class="songName">{{ newSongItem.name }}</p>
        <p class="songer">{{ newSongItem.song.artists[0].name }}</p>
      </span>
    </div>
    <div
      class="workPlay"
      v-show="isMouseMove && currentIndex === newSongItem.id"
    >
      <span class="download">
        <i class="bi bi-download"></i>
      </span>
      <span class="love">
        <i class="bi bi-heart"></i>
      </span>
      <span class="morework">
        <i class="bi bi-filter-left"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusicItem",
  props: {
    newSongItem: {
      type: Object,
    },
    newSongIndex: {
      type: Number,
    },
  },
  computed: {
    isPlayItem() {
      return (
        this.$store.state.nowSongDetail.id === this.newSongItem.id &&
        this.$store.state.isPlaying
      );
    },
  },
  data() {
    return {
      currentIndex: null,
      isMouseMove: false,
      // 第一次点击
      isFirstClick: true,
    };
  },
  methods: {
    playClick(newSongItem) {
      this.$emit("playClick", newSongItem);
    },
    // 播放音乐
    playMusic() {
      // 是第一次点击播放就退出,防止跟playClick冲突而报错
      if (this.isFirstClick) {
        this.isFirstClick = false;
        return;
      }
      this.$store.state.audio.play();
    },
    // 暂停音乐
    pauseMusic() {
      this.$store.state.audio.pause();
    },
  },
};
</script>


<style lang="less" scoped>
.n-item {
  width: 360px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  .song {
    display: flex;
    position: relative;
    img {
      width: 65px;
      border-radius: 10px;
    }
    .shadow {
      position: absolute;
      top: 0;
      border-radius: 10px;
      width: 65px;
      height: 65px;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .play {
      position: absolute;
      top: 9px;
      left: 17px;
      font-size: 35px;
      color: rgb(255 255 255 / 70%);
    }
    .songInfo {
      height: 65px;
      margin-left: 8px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: baseline;
      gap: 5px;

      p {
        color: black;
        font-weight: lighter;
      }

      .songName {
        font-size: 14px;
        color: #000000;
      }

      .songer {
        color: #787f8d;
        font-size: 12px;
      }
    }
  }

  .workPlay {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .play {
      font-size: 20px;
    }
  }
}
.n-item:hover {
  background-color: white;
}

// .n-item:hover {
//   background-color: white;
// }
</style>
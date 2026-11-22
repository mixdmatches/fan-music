<template>
  <div id="footer">
    <audio
      :src="songUrl"
      id="audio"
      ref="audioplay"
      @play="changeState(true)"
      @pause="changeState(false)"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
    ></audio>
    <!-- 左边 -->
    <div class="footer-left">
      <!-- 播放封面 -->
      <div class="imgs">
        <img class="img1" src="../assets/images/cp2.png" alt="" />
        <img class="img2" :src="cover" alt="" />
        <!-- <img class="img2" src="../assets/images/n1.jpg" alt="" /> -->
      </div>
      <!-- 封面右边部分 -->
      <div class="footer-left-right">
        <!-- 歌名歌手 -->
        <div class="songInfo">
          <p class="songName">{{ nowSongDetail.name || "" }}-</p>
          <p class="songerName">
            {{
              nowSongDetail.ar
                ? nowSongDetail.ar.map((item) => item.name).join("/")
                : ""
            }}
          </p>
        </div>
        <!-- 收藏,评论,转发,下载-->
        <div class="worktop">
          <span><i class="bi bi-download"></i></span>
          <span><i class="bi bi-folder-plus"></i></span>
          <span class="remarkcount">
            <i class="bi bi-chat-dots"></i>
            <i class="count">{{ formatComment(commentCount) }}</i>
          </span>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="footer-among">
      <div class="among-top">
        <!-- 喜欢 -->
        <span class="child"><i class="bi bi-heart"></i></span>
        <!-- 上一首 -->
        <span class="child"><i class="bi bi-skip-start-fill"></i></span>
        <!-- 播放 -->
        <span class="child" v-if="!isPlaying" @click="playMusic">
          <i class="bi bi-play-fill"></i>
        </span>
        <!-- 暂停 -->
        <span class="child" v-else @click="pauseMusic">
          <i class="bi bi-pause"></i>
        </span>
        <!-- 下一首 -->
        <span class="child"><i class="bi bi-skip-end-fill"></i></span>
        <!-- 循环播放... -->
        <span class="child"><i class="bi bi-repeat"></i></span>
      </div>
      <div class="among-bottom">
        <p class="current-time">{{ currentTime }}</p>
        <span class="music_progress_bar">
          <span ref="progress" class="music_progress_inline"></span>
        </span>
        <p class="time">{{ totalTime }}</p>
      </div>
    </div>
    <!-- 右边点击打开音乐列表 -->
    <div class="footer-right">
      <span class="musicList" @click="isOpenList = !isOpenList">
        <i class="bi bi-music-note-list"></i>
      </span>
    </div>
    <!-- 音乐列表 -->
    <div class="list" v-show="isOpenList">
      <!-- 头部 -->
      <div class="listHeader">
        <p>
          播放列表
          <i>{{ playingList.length }}</i>
        </p>
        <span class="clear" @click="clearList">清空列表</span>
      </div>
      <!-- 主体 -->
      <div class="listBody">
        <!-- 单 -->
        <div
          class="item"
          v-for="(item, index) in playingList"
          :key="index"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
        >
          <!-- 左边 -->
          <div class="song">
            <img :src="item.al.picUrl" alt="" />

            <!-- 遮罩层 -->
            <span class="shadow"></span>
            <!-- 播放按钮 -->
            <span class="play">
              <i class="bi bi-play-fill"></i>
            </span>
            <!-- 暂停 -->
            <!-- <span class="play">
              <i class="bi bi-pause"></i>
            </span> -->

            <span class="songInfo">
              <p class="songName">{{ item.name }}</p>
              <p class="songer">
                {{ item.ar.map((item) => item.name).join("/") }}
              </p>
            </span>
          </div>
          <!-- 右边 -->
          <div class="time">
            {{ formatDuration(item.dt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { usePlayerStore } from "@/store/player";
// 接口
import { getMusicComment, getSongUrl } from "@/api/listenMusic/listenMusic";
// 函数
import { formatComment } from "@/common/formatComment";
import { formatDuration } from "@/common/formatDuration";

const playerStore = usePlayerStore();
const { isPlaying, songUrl, nowSongDetail, playingList, currentSecond } =
  storeToRefs(playerStore);

const audioplay = ref(null);
const progress = ref(null);
const currentIndex = ref(null);
const isMouseMove = ref(false);
const isOpenList = ref(false);
// 歌曲评论数
const commentCount = ref(0);
// 格式化后的当前播放时长
const currentTime = ref(localStorage.getItem("currentTime") || "00:00");
// 当前歌曲总秒数
const totalSecond = ref(localStorage.getItem("totalSecond") || 0);
// 格式化后的总时长
const totalTime = ref(localStorage.getItem("totalTime") || "00:00");
// 进度条
const songProgress = ref(localStorage.getItem("songProgress") || 0);

// 当前歌曲封面，空值用可选链兜底
const cover = computed(() => nowSongDetail.value?.al?.picUrl || "");

// 改变播放状态
const changeState = (state) => playerStore.changePlayState(state);
// 播放音乐
const playMusic = () => {
  if (playingList.value.length < 1) {
    ElMessage({ message: "播放列表为空", type: "warning", center: true });
    return;
  }
  audioplay.value.currentTime = currentSecond.value;
  if (songUrl.value != " ") {
    audioplay.value.play();
  } else {
    getSongUrl(nowSongDetail.value.id).then((res) =>
      playerStore.saveSongUrl(res.data[0].url)
    );
  }
};
// 暂停音乐
const pauseMusic = () => audioplay.value.pause();
// 音频数据加载完后的事件
const onLoadedmetadata = (res) => {
  totalSecond.value = res.target.duration;
  totalTime.value = formatDuration(totalSecond.value);
  localStorage.setItem("totalTime", totalTime.value);
  localStorage.setItem("totalSecond", totalSecond.value);
};
// 播放时间更新
const onTimeupdate = (res) => {
  playerStore.saveCurrentSeconds(res.target.currentTime);
  currentTime.value = formatDuration(res.target.currentTime);
  localStorage.setItem("currentTime", currentTime.value);
  songProgress.value = Math.ceil(
    (currentSecond.value / totalSecond.value) * 100
  );
  if (songProgress.value != Infinity && !isNaN(songProgress.value)) {
    localStorage.setItem("songProgress", songProgress.value);
    progress.value.style.width = `${songProgress.value}%`;
  }
};
// 获取当前音乐的评论数
const getMusicCommentBy = (id) => {
  getMusicComment(id).then((res) => {
    commentCount.value = res.total;
  });
};
// 保存 audio 标签到 store
const saveAudio = () => playerStore.saveAudio(audioplay.value);
// 清空列表
const clearList = () => playerStore.clearSongList();

onMounted(() => {
  saveAudio();
  // 没有当前歌曲时不请求评论
  if (nowSongDetail.value?.id) getMusicCommentBy(nowSongDetail.value.id);
});
</script>

<style lang="less" scoped>
#footer {
  position: relative;
  grid-area: footer;
  background-color: var(--base-footer);
  border-top: 1px var(--border-color) solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  // 底部左边
  .footer-left {
    // width: 200px;
    height: 100%;
    // background-color: aqua;
    margin-left: 20px;
    display: flex;
    align-items: center;

    // 播放封面
    .imgs {
      position: relative;

      .img1 {
        width: 50px;
      }

      .img2 {
        position: absolute;
        border-radius: 50%;
        width: 35px;
        top: 8px;
        left: 7px;
      }
    }

    // 封面右边部分
    .footer-left-right {
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .songInfo {
        display: flex;
        align-items: center;

        p {
          color: #787f8d;
          font-size: 12px;
          float: left;
          font-weight: lighter;
        }

        .songerName {
          font-size: 10px;
          color: #787f8d;
        }
      }

      .worktop {
        display: flex;
        gap: 20px;

        span {
          color: #787f8d;
        }

        .remarkcount {
          position: relative;

          .count {
            position: absolute;
            top: 0;
            right: -9px;
            font-size: 7px;
            background-color: white;
          }
        }
      }
    }
  }

  // 底部中间
  .footer-among {
    width: 350px;
    height: 100%;

    .among-top {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70%;
      gap: 15px;

      span {
        // font-weight: lighter;
        color: #787f8d;
        font-size: 20px;
        .bi-heart-fill {
          color: red;
        }
      }

      .child:nth-child(3) {
        font-size: 40px;
        color: red;
      }
    }

    .among-bottom {
      height: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      .music_progress_bar {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: rgb(218, 220, 223);

        .music_progress_inline {
          display: block;
          width: 10%;
          height: 100%;
          border-radius: 2px;
          background-color: red;
        }
      }

      p {
        font-weight: lighter;
        font-size: 9px;
        color: #787f8d;
      }
    }
  }

  // 底部右边
  .footer-right {
    width: 200px;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    padding-right: 20px;
    span {
      color: #787f8d;
      position: relative;
      .musicList {
        position: absolute;
        top: -200px;
        right: 0;
        width: 200px;
        height: 200px;
        // background-color: red;
      }
    }
  }

  // 音乐列表
  .list {
    position: absolute;
    top: -655px;
    right: 0;
    width: 20vw;
    height: 80vh;
    // border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    .listHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      width: 100%;
      height: 8%;
      background-color: var(--base-footer);
      border-bottom: 1px solid var(--border-color);
      p {
        font-size: 14px;
        position: relative;
        color: var(--text-select-color);
        i {
          position: absolute;
          top: 0;
          font-size: 10px;
        }
      }
      .clear {
        color: var(--text-select-color);
        font-size: 12px;
      }
    }
    .listBody {
      width: 100%;
      height: 92%;
      background-color: var(--base-footer);
      overflow: auto;
      .item {
        display: flex;
        padding: 10px;
        align-items: center;
        justify-content: space-between;
        .song {
          position: relative;
          display: flex;
          img {
            width: 50px;
            height: 50px;
            border-radius: 10px;
          }
          .shadow {
            position: absolute;
            top: 0;
            border-radius: 10px;
            width: 50px;
            height: 50px;
            background-color: rgba(0, 0, 0, 0.3);
          }
          .play {
            position: absolute;
            top: 2px;
            left: 8px;
            font-size: 35px;
            color: rgb(255 255 255 / 70%);
          }
          .songInfo {
            margin-left: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: baseline;
            p {
              white-space: nowrap; /* 防止文本换行 */
              color: var(--text-color);
              font-weight: lighter;
            }

            .songName {
              font-size: 14px;
              color: var(--text-color);
            }

            .songer {
              color: var(--text-color);
              font-size: 12px;
            }
          }
        }
        .time {
          color: #787f8d;
          font-size: 12px;
        }
      }
      .item:hover {
        background-color: var(--text-select-box);
      }
    }
    .listBody::-webkit-scrollbar {
      width: 4px; /* 设置滚动条宽度 */
      height: 4px;
    }
    .listBody::-webkit-scrollbar-track {
      background-color: transparent; /* 设置滚动条轨道背景透明 */
    }
  }
}
</style>
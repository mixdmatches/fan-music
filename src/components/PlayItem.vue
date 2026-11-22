<template>
  <!-- 单首歌 -->
  <div class="n-item">
    <img src="@/assets/images/n1.jpg" alt="" />
    <span class="song">
      <p class="songName">Wake</p>
      <p class="songer">圈圈菌</p>
    </span>
    <div class="workPlay">
      <span class="play" @click="handlePlay">
        <i :class="playIcon"></i>
      </span>
      <span class="download">
        <i class="bi bi-download"></i>
      </span>
      <span class="love" @click="handleLoveIcon">
        <i :class="loveIcon"></i>
      </span>
      <span class="morework">
        <i class="bi bi-filter-left"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 组件内部维护播放 / 收藏图标状态
const isPlay = ref(false);
const playIcon = ref("bi bi-play-fill");
const isLove = ref(false);
const loveIcon = ref("bi bi-heart");

// 切换收藏图标
const handleLoveIcon = () => {
  isLove.value = !isLove.value;
  loveIcon.value = isLove.value ? "bi bi-heart-fill" : "bi bi-heart";
};
// 切换播放图标
const handlePlay = () => {
  isPlay.value = !isPlay.value;
  playIcon.value = isPlay.value ? "bi bi-pause" : "bi bi-play-fill";
};
</script>


<style lang="less" scoped>
.n-item {
  width: 390px;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
  img {
    width: 65px;
    border-radius: 10px;
  }

  // 给图片加蒙版
  img::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 灰黑色蒙版 */
    opacity: 0;
    /* 初始透明度设为0 */
    transition: opacity 0.3s ease;
    /* 过渡效果 */
  }

  .song {
    height: 65px;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5px;

    p {
      color: black;
      font-weight: lighter;
    }

    .songName {
      font-size: 16px;
      color: #000000;
    }

    .songer {
      color: #787f8d;
      font-size: 12px;
    }
  }

  .workPlay {
    margin-left: 135px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .play {
      font-size: 20px;
    }
  }
}

// .n-item:hover {
//   background-color: white;
// }
</style>
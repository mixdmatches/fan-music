<template>
  <div class="leaderBoardBox">
    <p>{{ commend.title }}</p>
    <div class="boardBox">
      <div
        class="m-item"
        v-for="(item, index) in commend.commendBoard"
        :key="item.id"
        @mouseover="
          isMouseMove = true;
          currentIndex = index;
        "
        @mouseout="isMouseMove = false"
      >
        <img :src="item.coverImgUrl" alt="" />
        <span class="text">{{ item.updateFrequency }}</span>
        <!-- 遮罩层 -->
        <span
          class="shadow"
          v-show="isMouseMove && currentIndex === index"
        ></span>
        <!-- 播放按钮 -->
        <span
          class="play"
          v-show="isMouseMove && currentIndex === index"
          @click="playClick"
          ><i class="bi bi-play-fill"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  commend: {
    type: Object,
  },
  publicB: {
    type: Object,
  },
});

const currentIndex = ref(null);
const isMouseMove = ref(false);

// 点击播放
const playClick = () => {
  console.log("点击");
};
</script>

<style lang="less" scoped>
.leaderBoardBox {
  margin-bottom: 30px;
  p {
  }
  .boardBox {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .m-item {
      margin-top: 10px;
      position: relative;
      width: 157px;
      height: 157px;
      .shadow {
        position: absolute;
        top: 0;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .play {
        position: absolute;
        bottom: 0px;
        right: 0px;
        font-size: 50px;
        color: rgb(255 255 255 / 70%);
      }
      img {
        display: block;
        width: 100%;
        border-radius: 10px;
      }
      .text {
        position: absolute;
        top: 68%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgb(145, 145, 145);
        font-size: 12px;
      }
      .icon {
      }
    }
  }
}
</style>
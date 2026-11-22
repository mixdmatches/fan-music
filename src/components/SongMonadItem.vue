<template>
  <!-- 单个歌单 -->
  <div
    class="m-item"
    @mouseover="
      isMouseMove = true;
      currentIndex = monadIndex;
    "
    @mouseout="isMouseMove = false"
    @click.stop="openDetail(monadListItem.id)"
  >
    <!-- 歌单封面 -->
    <img class="cover" v-lazy="monadListItem.coverImgUrl" alt="" />
    <!-- 遮罩层 -->
    <span
      class="shadow"
      v-show="isMouseMove && currentIndex === monadIndex"
    ></span>
    <!-- 播放按钮 -->
    <span
      class="play"
      v-show="isMouseMove && currentIndex === monadIndex"
      @click.stop="playAll(monadListItem.id)"
    >
      <i class="bi bi-play-circle-fill"></i>
    </span>
    <!-- 播放量 -->
    <span class="playCount"
      ><i class="bi bi-caret-right-fill"></i>{{ listenCount }}</span
    >
    <!-- 底部文字描述 -->
    <span class="text-bottom">
      <p>{{ monadListItem.name }}</p>
    </span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "@/store/player";
import { formatNum } from "@/common/listenCount";
// 引入接口
import { getMonadMusics } from "@/api/findMusic/monadPlace/monadPlace";
import { getSongUrl } from "@/api/listenMusic/listenMusic";

const props = defineProps({
  monadListItem: {
    type: Object,
  },
  monadIndex: {
    type: Number,
  },
});
const router = useRouter();
const playerStore = usePlayerStore();

const currentIndex = ref(null);
const isMouseMove = ref(false);
const monadMusics = ref([]);

// 播放量格式化
const listenCount = computed(() => formatNum(props.monadListItem.playCount));

// 进入歌单详情页
const openDetail = (id) => {
  router.push({ path: "/monaddetail", query: { id } });
};
// 获取歌单所有歌曲
const getMonadMusicsBy = async (id) => {
  const res = await getMonadMusics(id);
  monadMusics.value = res.songs;
};
// 点击播放全部
const playAll = async (id) => {
  const res = await getSongUrl(monadMusics.value[0].id);
  playerStore.saveSongUrl(res.data[0].url);
  playerStore.changePlayState(true);
  playerStore.saveSongDetail(monadMusics.value[0]);
  playerStore.addAllSong(monadMusics.value);
};

onMounted(() => getMonadMusicsBy(props.monadListItem.id));
</script>

<style lang="less" scoped>
.m-item {
  position: relative;
  margin-top: 20px;
  .shadow {
    position: absolute;
    top: 0;
    border-radius: 10px;
    width: 170px;
    height: 170px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .play {
    position: absolute;
    top: 48%;
    left: 72%;
    font-size: 46px;
    color: rgb(255 255 255 / 70%);
  }
  .cover {
    display: block;
    width: 170px;
    border-radius: 10px;
  }

  .logo-small {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 20px;
  }

  .playCount {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    border-radius: 5px;
    color: white;
    font-family: "Arial", sans-serif;
    font-size: 10px;
    background-color: rgba(158, 158, 158, 0.5);
  }

  .text-bottom {
    position: absolute;
    width: 100%;
    height: 25%;
    bottom: 0px;
    right: 0;
    border-bottom-left-radius: 10px;
    /* 左下角圆角 */
    border-bottom-right-radius: 10px;
    /* 右下角圆角 */
    background-color: rgba(158, 158, 158, 0.5);
    padding-top: 6px;

    p {
      margin-left: 6px;
      color: white;
      font-size: 12px;
    }
  }
}
</style>
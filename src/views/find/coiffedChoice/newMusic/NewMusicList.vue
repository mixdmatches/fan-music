<template>
  <!-- 最新音乐 -->
  <div class="newMusic">
    <!-- 标题 -->
    <p>最新音乐<i class="bi bi-chevron-right"></i></p>
    <!-- 一些歌 -->
    <div class="newMusic-items">
      <NewMusicItem
        :newSongItem="item"
        v-for="item in newSongList"
        :key="item.id"
        @playClick="playClick"
      ></NewMusicItem>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePlayerStore } from "@/store/player";
// 网络请求
import { getNewSong } from "@/api/findMusic/coiffedChoice/coiffedchoice";
import { getSongUrl, getSongDetail } from "@/api/listenMusic/listenMusic";
// 引入组件
import NewMusicItem from "./newMusicItem/NewMusicItem.vue";

const playerStore = usePlayerStore();

// 新音乐列表
const newSongList = ref([]);

// 获取最新音乐列表
const getNewSongBy = async (limit) => {
  const res = await getNewSong(limit);
  newSongList.value = res.result;
};
// 点击播放音乐
const playClick = async (item) => {
  const urlRes = await getSongUrl(item.id);
  playerStore.saveSongUrl(urlRes.data[0].url);
  const detailRes = await getSongDetail(item.id);
  playerStore.saveSongDetail(detailRes.songs[0]);
  playerStore.addPlayinglist(playerStore.nowSongDetail);
};

onMounted(() => getNewSongBy(9));
</script>

<style lang="less" scoped>
// 最新音乐
.newMusic {
  margin-top: 50px;
  height: auto;
  display: flex;
  flex-wrap: wrap;

  p {
    display: block;
    float: left;
    color: black;
    font-size: 16px;
  }

  .newMusic-items {
    float: left;
    width: 100%;
    margin-top: 10px;
    display: flex;
    /* 开启flex布局 */
    justify-content: space-between;
    /* 水平方向上两边对齐 */
    flex-wrap: wrap;
  }
}
</style>
<template>
  <!-- 最新音乐 -->
  <div class="newMusic">
    <!-- 标题 -->
    <p>最新音乐<i class="el-icon-arrow-right"></i></p>
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

<script>
// 网络请求
import { getNewSong } from "@/api/findMusic/coiffedChoice/coiffedchoice";
import { getSongUrl, getSongDetail } from "@/api/listenMusic/listenMusic";
// 引入组件
import NewMusicItem from "./newMusicItem/NewMusicItem.vue";
// vuex
import { mapGetters } from "@/store/getters";
export default {
  name: "NewMusicList",
  components: {
    NewMusicItem,
  },
  data() {
    return {
      // 新音乐列表
      newSongList: [],
      // 被点击播放的音乐url
      songUrl: "",
    };
  },
  methods: {
    // 获取新音乐列表
    async getNewSongBy(limit) {
      await getNewSong(limit).then((res) => {
        this.newSongList = res.result;
      });
    },

    // 点击播放音乐按钮
    async playClick(item) {
      console.log("点击最新音乐" + item.id);
      // 1.获取url
      await getSongUrl(item.id).then((res) => {
        // 保存歌曲url丢进仓库中
        const { url } = res.data[0];
        this.$store.commit("saveSongUrl", url);
      });
      // 2.获取歌曲详情
      await getSongDetail(item.id).then((res) => {
        // 保存播放的歌曲详情
        this.$store.commit("saveSongDetail", res.songs[0]);
        // 把该歌曲存进playingList
        this.$store.commit("addPlayinglist", this.$store.state.nowSongDetail);
      });
    },
  },
  created() {
    this.getNewSongBy(9);
  },
};
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
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
    <img class="cover" v-lazy="monadListItem.picUrl" alt="" />
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
      ><i class="el-icon-caret-right"></i>{{ listenCount }}</span
    >
    <!-- 底部文字描述 -->
    <span class="text-bottom">
      <p>{{ monadListItem.name }}</p>
    </span>
  </div>
</template>

<script>
import { formatNum } from "@/common/listenCount";
import { mapGetters } from "vuex";
// 引入接口
import { getMonadMusics } from "@/api/findMusic/monadPlace/monadPlace";
import { getSongUrl, getSongDetail } from "@/api/listenMusic/listenMusic";
export default {
  name: "AuthorityPlayItem",
  props: {
    monadListItem: {
      type: Object,
    },
    monadIndex: {
      type: Number,
    },
  },
  data() {
    return {
      currentIndex: null,
      isMouseMove: false,
      monadMusics: [],
    };
  },
  computed: {
    ...mapGetters([
      "isPlaying",
      "songUrl",
      "nowSongDetail",
      "playingList",
      "currentSecond",
      "audio",
    ]),
  },
  methods: {
    playClick(id) {
      console.log("点击" + id);
    },
    // 获取歌单所有歌曲
    async getMonadMusicsBy(id) {
      await getMonadMusics(id).then((res) => {
        this.monadMusics = res.songs;
      });
    },
    // 点击播放全部
    async playAll(id) {
      // audio.src赋值,然后自动播放第一首歌
      // 获得第一首歌的url
      await getSongUrl(this.monadMusics[0].id).then((res) => {
        const { url } = res.data[0];
        // 保存歌曲Url
        this.$store.dispatch("saveSongUrl", url);
      });
      // 改变播放状态
      this.$store.dispatch("changePlayState", true);
      // 保存当前播放歌曲详情
      this.$store.dispatch("saveSongDetail", this.monadMusics[0]);
      // 把歌单所有歌曲传入playingList
      this.$store.dispatch("addAllSong", this.monadMusics);
    },
    // 进入歌单详情页
    openDetail(id) {
      this.$router.push({
        path: "/monaddetail",
        query: { id: id },
      });
      console.log("歌单页" + id);
    },
  },
  computed: {
    listenCount() {
      return formatNum(this.monadListItem.playCount);
    },
  },
  created() {
    this.getMonadMusicsBy(this.monadListItem.id);
  },
};
</script>

<style lang="less" scoped>
.m-item {
  position: relative;

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
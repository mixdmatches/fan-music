<template>
  <!-- 搜索结果 -->
  <div class="resultList">
    <!-- 单曲搜索结果 -->
    <div id="table" v-if="type === 1">
      <!-- 表格头部 -->
      <div id="thead">
        <span>标题</span>
        <span>专辑</span>
        <span>喜欢</span>
        <span>时长</span>
      </div>
      <!-- 表格主体 -->
      <div id="tbody">
        <div
          id="tr"
          v-for="(item, index) in result.songs"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = index;
          "
          @mouseout="isMouseMove = false"
        >
          <!-- 标题 -->
          <span class="title">
            <!-- <div class="n-item"> -->
            <div class="song">
              <img v-lazy="item.al.picUrl" alt="" />

              <!-- 遮罩层 -->
              <span
                class="shadow"
                v-show="isMouseMove && currentIndex === index"
              ></span>
              <!-- 播放按钮 -->
              <span
                class="play"
                v-show="isMouseMove && currentIndex === index"
                @click.stop="playClick(item.id)"
              >
                <i class="bi bi-play-fill"></i>
              </span>

              <span class="songInfo">
                <p class="songName">{{ item.name }}</p>
                <p class="songer">{{ item.ar[0].name }}</p>
              </span>
            </div>
            <div
              class="workPlay"
              v-show="isMouseMove && currentIndex === index"
            >
              <span>
                <i class="bi bi-folder-plus"></i>
              </span>
              <span class="download">
                <i class="bi bi-download"></i>
              </span>
              <span class="morework">
                <i class="bi bi-filter-left"></i>
              </span>
              <!-- </div> -->
            </div>
          </span>
          <!-- 专辑 -->
          <span class="album">{{ item.al.name }}</span>
          <!-- 喜欢 -->
          <span class="like">
            <span class="love">
              <i class="bi bi-heart"></i>
            </span>
          </span>
          <!-- 时长 -->
          <span class="totalTime">{{ item.dt | formatDuration(item.dt) }}</span>
        </div>
      </div>
    </div>

    <!-- 专辑搜索结果 -->
    <div id="table" v-if="type === 10">
      <!-- 表格头部 -->
      <div id="thead">
        <span>标题</span>
        <span>作者</span>
        <span>时间</span>
      </div>
      <!-- 表格主体 -->
      <div id="tbody">
        <div
          id="tr"
          v-for="(item, index) in result.albums"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = index;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openAlbumDetail(item.id)"
        >
          <!-- 标题 -->
          <span class="title">
            <div class="song">
              <img v-lazy="item.picUrl" alt="" />

              <!-- 遮罩层 -->
              <span
                class="shadow"
                v-show="isMouseMove && currentIndex === index"
              ></span>
              <!-- 播放按钮 -->
              <span
                class="play"
                v-show="isMouseMove && currentIndex === index"
                @click.stop="playClick(item.id)"
              >
                <i class="bi bi-play-fill"></i>
              </span>

              <span class="songInfo">
                <p class="songName">{{ item.name }}</p>
              </span>
            </div>
            <div
              class="workPlay"
              v-show="isMouseMove && currentIndex === index"
            ></div>
          </span>
          <!-- 作者 -->
          <span class="album">{{ item.artist.name }}</span>
          <!-- 时间 -->
          <span class="totalTime">{{
            item.publishTime | formatDate(item.publishTime)
          }}</span>
        </div>
      </div>
    </div>

    <!-- 歌手搜索结果 -->
    <div class="singerView" v-if="type === 100">
      <div
        class="singerItem"
        v-for="(item, index) in result.artists"
        :key="index"
        @mouseover="
          isMouseMove = true;
          currentIndex = index;
        "
        @mouseout="isMouseMove = false"
      >
        <img v-lazy="item.img1v1Url" alt="" />
        <!-- 蒙版 -->
        <span
          class="shadow"
          v-show="isMouseMove && currentIndex === index"
        ></span>
        <!-- 播放按钮 -->
        <span
          class="play"
          v-show="isMouseMove && currentIndex === index"
          @click="playClick"
        >
          <i class="bi bi-play-fill"></i>
        </span>
        <span>{{ item.name }}</span>
        <p>专辑:{{ item.albumSize }}</p>
      </div>
    </div>

    <!-- 歌单搜索结果 -->
    <div id="table" v-if="type === 1000">
      <!-- 表格头部 -->
      <div id="thead">
        <span>标题</span>
        <span>歌曲数</span>
        <span>创建者</span>
        <span>播放量</span>
      </div>
      <!-- 表格主体 -->
      <div id="tbody">
        <div
          id="tr"
          v-for="(item, index) in result.playlists"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = index;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openMonadDetail(item.id)"
        >
          <!-- 标题 -->
          <span class="title">
            <div class="song">
              <img v-lazy="item.coverImgUrl" alt="" />

              <!-- 遮罩层 -->
              <span
                class="shadow"
                v-show="isMouseMove && currentIndex === index"
              ></span>
              <!-- 播放按钮 -->
              <span
                class="play"
                v-show="isMouseMove && currentIndex === index"
                @click.stop="playClick(item.id)"
              >
                <i class="bi bi-play-fill"></i>
              </span>

              <span class="songInfo">
                <p class="songName">{{ item.name }}</p>
                <p class="songer" v-if="item.name !== keyword">
                  包含《{{ keyword }}》
                </p>
              </span>
            </div>
          </span>
          <!-- 歌曲数 -->
          <span class="album">{{ item.trackCount }}</span>
          <!-- 创建者-->
          <span class="totalTime">{{ item.creator.nickname }}</span>
          <!-- 播放量-->
          <span class="like">{{
            item.playCount | formatNum(item.playCount)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 格式化
import { formatNum } from "@/common/listenCount";
import { formatDuration } from "@/common/formatDuration";
import { formatDate } from "@/common/formatDate";
// 接口
import { getSongUrl, getSongDetail } from "@/api/listenMusic/listenMusic";
export default {
  name: "SearchResult",
  props: {
    // 搜索结果
    result: {
      type: Object,
    },
    // 搜索类型
    type: {
      type: Number,
    },
    // 搜索词
    keyword: {
      type: String,
    },
  },
  data() {
    return {
      // 格式化时长
      date: [],
      // 格式化播放量
      playCount: [],
      // 鼠标是否移到元素上
      isMouseMove: false,
      // 当前鼠标移动到的行
      currentIndex: null,
    };
  },
  // 过滤器
  filters: {
    formatNum(count) {
      return formatNum(count);
    },
    formatDuration(time) {
      return formatDuration(time);
    },
    formatDate(date) {
      return formatDate(date);
    },
  },
  methods: {
    // 点击播放
    playClick(id) {
      console.log("点击" + id);
      // 1.获取url
      getSongUrl(id).then((res) => {
        // 保存歌曲url丢进仓库中
        const { url } = res.data[0];
        this.$store.commit("saveSongUrl", url);
      });
      // 2.获取歌曲详情
      getSongDetail(id).then((res) => {
        // 保存播放的歌曲详情
        this.$store.commit("saveSongDetail", res.songs[0]);
        // 把该歌曲存进playingList
        this.$store.commit("addPlayinglist", this.$store.state.nowSongDetail);
      });
    },
    // 进入专辑详情页
    openAlbumDetail(id) {
      this.$router.push({
        path: "/zhuanjidetail",
        query: { id: id },
      });
      console.log("专辑页" + id);
    },
    // 进入歌单详情页
    openMonadDetail(id) {
      this.$router.push({
        path: "/monaddetail",
        query: { id: id },
      });
      console.log("歌单页" + id);
    },
  },
};
</script>

<style lang="less" scoped>
.resultList {
  #table {
    width: 100%;
    // 表格头部
    #thead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      span {
        // text-align: center;
        color: rgb(143, 149, 162);
        padding-left: 10px;
        font-size: 12px;
      }
      span:nth-child(1) {
        width: 50%;
      }
      span:nth-child(2) {
        width: 30%;
      }
      span:nth-child(3) {
        width: 5%;
      }
      span:nth-child(4) {
        width: 5%;
      }
    }
    // 表格主体
    #tbody {
      margin-top: 10px;
      #tr {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        padding: 10px;
        .title {
          width: 50%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          // padding: 10px;
          .song {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            img {
              width: 40px;
              height: 40px;
              border-radius: 5px;
            }
            .shadow {
              position: absolute;
              top: 0;
              border-radius: 5px;
              width: 40px;
              height: 40px;
              background-color: rgba(0, 0, 0, 0.3);
            }
            .play {
              position: absolute;
              top: 1px;
              left: 7px;
              font-size: 30px;
              color: rgb(255 255 255 / 70%);
            }
            .songInfo {
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: baseline;
              margin-left: 15px;
              p {
                white-space: nowrap; /* 防止文本换行 */
                color: black;
                font-weight: lighter;
              }

              .songName {
                font-size: 12px;
                color: #000000;
              }

              .songer {
                color: #787f8d;
                font-size: 12px;
              }
            }
          }

          .workPlay {
            color: rgb(143, 149, 162);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 30px;
            gap: 20px;
            .play {
              font-size: 20px;
            }
          }
        }
        .album {
          width: 40%;
          padding-left: 10px;
          color: rgb(143, 149, 162);
          font-size: 12px;
        }
        .like {
          // text-align: center;
          padding-left: 10px;
          width: 5%;
          color: rgb(143, 149, 162);
          font-size: 12px;
        }
        .totalTime {
          font-size: 10px;
          width: 5%;
          color: rgb(143, 149, 162);
        }
        span:nth-child(1) {
          width: 50%;
        }
        span:nth-child(2) {
          width: 30%;
        }
        span:nth-child(3) {
          width: 5%;
        }
        span:nth-child(4) {
          width: 5%;
        }
      }
      #tr:hover {
        border-radius: 10px;
        background-color: white;
      }
    }
  }
  .singerView {
    // margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .singerItem {
      position: relative;
      width: 186px;
      height: 230px;
      border-radius: 10px;
      // background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      img {
        width: 80%;
        // height: 80%;
        border-radius: 50%;
      }
      .shadow {
        position: absolute;
        top: 6%;
        left: 10%;
        border-radius: 50%;
        width: 150px;
        height: 150px;
        background-color: rgba(0, 0, 0, 0.2);
      }

      .play {
        position: absolute;
        top: 12%;
        left: 30%;
        font-size: 90px;
        color: rgb(255 255 255 / 70%);
      }
      span {
        color: rgb(60, 69, 90);
        font-weight: lighter;
      }
      p {
        font-size: 10px;
        font-weight: lighter;
        color: rgb(123, 130, 144);
      }
    }
    .singerItem:hover {
      background-color: white;
    }
  }
}
</style>
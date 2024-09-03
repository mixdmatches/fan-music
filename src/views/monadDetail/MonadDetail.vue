<template>
  <div id="monadDetail">
    <div class="top">
      <div class="header-left">
        <img v-lazy="monadDetail.coverImgUrl" alt="" />
        <span class="playCount"
          ><i class="el-icon-caret-right"></i>{{ playCount }}</span
        >
      </div>
      <div class="header-right">
        <div class="info">
          <p class="title">{{ monadDetail.name }}</p>
          <p class="description">{{ monadDetail.description }}</p>
          <div class="creator">
            <img v-lazy="monadDetail.creator.avatarUrl" alt="" />
            <p class="creatorname">{{ monadDetail.creator.nickname }}</p>
            <p class="tab">标签: {{ tags }}</p>
            <p class="creatortime">
              {{
                monadDetail.createTime | formatDate(monadDetail.createTime)
              }}创建
            </p>
          </div>
        </div>
        <!-- 操作 -->
        <div class="workplay">
          <span class="playall" @click="playAll(id)">
            <i class="bi bi-play-fill"></i>
            播放全部
          </span>
          <span @click="shoucang">
            <i class="bi bi-folder-plus"></i>
            {{ subscribedCount }}
          </span>
        </div>
      </div>
    </div>
    <div class="body">
      <BlackTabNav :TypeList="tabs" @tabClick="tabClick"></BlackTabNav>
      <!-- 歌曲 -->
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
            v-for="(item, index) in monadMusics"
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
                  <p class="songer">
                    {{ item.ar.map((item) => item.name).join("/") }}
                  </p>
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
            <span class="totalTime">{{
              item.dt | formatDuration(item.dt)
            }}</span>
          </div>
        </div>
      </div>
      <div class="comment" v-if="type === 2">
        <!-- 精彩评论 -->
        <div class="hotComment" v-if="hotComments.length !== 0">
          <div class="title">
            精彩评论
            <i>{{ monadComments.total }}</i>
          </div>
          <div class="commentItem" v-for="item in hotComments" :key="item.id">
            <img v-lazy="item.user.avatarUrl" alt="" />
            <div class="info">
              <p class="name">{{ item.user.nickname }}</p>
              <p class="content">
                {{ item.content }}
              </p>
              <!-- 如果是被回复的评论 -->
              <!-- <div class="beContent"></div> -->
              <p class="time">{{ item.timeStr }}</p>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="newComment" v-if="monadComments.length !== 0">
          <div class="title">
            最新评论
            <i>{{ monadComments.total }}</i>
          </div>
          <div class="commentItem" v-for="item in monadComments" :key="item.id">
            <img v-lazy="item.user.avatarUrl" alt="" />
            <div class="info">
              <p class="name">{{ item.user.nickname }}</p>
              <p class="content">
                {{ item.content }}
              </p>
              <!-- 如果是被回复的评论 -->
              <!-- <div class="beContent"></div> -->
              <p class="time">{{ item.timeStr }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="collector" v-if="type === 3">收藏者</div> -->
    </div>
  </div>
</template>

<script>
// 引入接口
import {
  getMonadDetail,
  getMonadMusics,
  getMonadComment,
} from "@/api/findMusic/monadPlace/monadPlace";
import { getSongUrl, getSongDetail } from "@/api/listenMusic/listenMusic";
// 引入函数
import { formatNum } from "@/common/listenCount";
import { formatDuration } from "@/common/formatDuration";
import { formatDate } from "@/common/formatDate";
// 引入导航组件
import BlackTabNav from "@/components/BlackTabNav.vue";
// vuex
import { mapGetters } from "vuex";
import { playingList, songUrl } from "@/store/getters";
export default {
  name: "MonadDetail",
  components: {
    BlackTabNav,
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
  data() {
    return {
      tabs: [
        { name: "歌曲", type: 1 },
        { name: "评论", type: 2 },
        // { name: "收藏者", type: 3 },
      ],
      type: 1,
      monadDetail: {},
      monadMusics: [],
      monadComments: [],
      hotComments: [],
      currentIndex: null,
      isMouseMove: false,
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    tags() {
      return this.monadDetail.tags.join("/");
    },
    playCount() {
      return formatNum(this.monadDetail.playCount);
    },
    subscribedCount() {
      return formatNum(this.monadDetail.subscribedCount);
    },
  },
  // 过滤器
  filters: {
    formatDuration(time) {
      return formatDuration(time);
    },
    formatDate(time) {
      return formatDate(time);
    },
  },
  methods: {
    tabClick(item) {
      this.type = item.type;
    },
    // 获取歌单详情
    getMonadDetailBy(id) {
      getMonadDetail(id).then((res) => {
        this.monadDetail = res.playlist;
        console.log(this.monadDetail);
        console.log("歌单详情");
      });
    },
    // 获取歌单所有歌曲
    getMonadMusicsBy(id) {
      getMonadMusics(id).then((res) => {
        this.monadMusics = res.songs;
        console.log(this.monadMusics);
        console.log("歌单歌曲");
      });
    },
    // 获取歌单评论
    getMonadCommentBy(id) {
      getMonadComment(id).then((res) => {
        this.monadComments = res.comments;
        this.hotComments = res.hotComments;
      });
    },
    // 点击播放全部
    playAll(id) {
      // audio.src赋值,然后自动播放第一首歌
      // 获得第一首歌的url
      getSongUrl(this.monadMusics[0].id).then((res) => {
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
      console.log("播放全部" + id);
      console.log(this.songUrl);
    },
    // 点击收藏
    shoucang() {
      console.log("收藏");
    },
    // 点击单首音乐
    playClick(id) {
      console.log("点击" + id);
      // 获取被点击的音乐url
      getSongUrl(id).then((res) => {
        const { url } = res.data[0];
        // 保存歌曲Url
        this.$store.dispatch("saveSongUrl", url);
      });
      // 获取被点击的音乐详情
      getSongDetail(id).then((res) => {
        const detail = res.songs[0];
        // 保存当前播放歌曲详情
        this.$store.dispatch("saveSongDetail", detail);
        //添加单个音乐到播放列
        this.$store.dispatch("addPlayinglist", detail);
      });
    },
  },
  created() {
    this.getMonadDetailBy(this.id);
    this.getMonadMusicsBy(this.id);
    this.getMonadCommentBy(this.id);
  },
};
</script>

<style lang="less" scoped>
#monadDetail {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 155px;
    gap: 15px;
    display: flex;
    // justify-content: center;
    align-content: center;
    .header-left {
      position: relative;
      // width: 155px;
      height: 155px;
      img {
        height: 100%;
        border-radius: 10px;
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
    }
    .header-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // width: 300px;
      .info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .title {
          font-weight: 600;
        }
        .description {
          font-size: 10px;
          color: #ccc;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1; /* 设置最大显示行数 */
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .creator {
          display: flex;
          align-items: center;
          gap: 5px;
          img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
          }
          p {
            font-size: 10px;
            color: #ccc;
          }
        }
      }
      .workplay {
        width: 100%;
        // background-color: aquamarine;
        display: flex;
        gap: 10px;
        span {
          font-size: 12px;
          padding: 10px;
          background-color: rgb(240, 243, 246);
          border-radius: 10px;
        }
        .playall {
          color: white;
          background-color: rgb(252, 61, 75);
        }
      }
    }
  }
  .body {
    width: 100%;
    height: 70%;
    // background-color: aqua;
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
          .title {
            width: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
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
            font-size: 12px;
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
    .comment {
      .hotComment {
        .title {
          position: relative;
          font-size: 12px;
          font-weight: 500;
          i {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 8px;
          }
        }
        .commentItem {
          margin-top: 10px;
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #ececec;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
          .info {
            .name {
              font-size: 12px;
              color: rgb(117, 140, 190);
            }
            .content {
              font-size: 13px;
              color: rgb(60, 69, 90);
              font-weight: lighter;
            }
            .time {
              margin-top: 10px;
              font-size: 10px;
              color: rgb(60, 69, 90);
            }
            p {
              margin-bottom: 3px;
            }
          }
        }
      }
      .newComment {
        margin-top: 10px;
        .title {
          position: relative;
          font-size: 12px;
          font-weight: 500;
          i {
            position: absolute;
            top: -5px;
            right: -5px;
            font-size: 8px;
          }
        }
        .commentItem {
          margin-top: 10px;
          display: flex;
          gap: 15px;
          border-bottom: 1px solid #ececec;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
          .info {
            .name {
              font-size: 12px;
              color: rgb(117, 140, 190);
            }
            .content {
              font-size: 13px;
              color: rgb(60, 69, 90);
              font-weight: lighter;
            }
            .time {
              margin-top: 10px;
              font-size: 10px;
              color: rgb(60, 69, 90);
            }
            p {
              margin-bottom: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
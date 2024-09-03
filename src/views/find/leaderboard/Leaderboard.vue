<template>
  <div id="Leader">
    <div class="leaderBoardBox">
      <p>榜单推荐</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in commendBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>官方榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="(item, index) in publicBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === index"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>精选榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in pickedBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>曲风榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in styleBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>全球榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in globaBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>语种榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in languageBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="leaderBoardBox">
      <p>特色榜</p>
      <div class="boardBox">
        <div
          class="m-item"
          v-for="item in featuredBoard"
          :key="item.id"
          @mouseover="
            isMouseMove = true;
            currentIndex = item.id;
          "
          @mouseout="isMouseMove = false"
          @click.stop="openDetail(item.id)"
        >
          <img v-lazy="item.coverImgUrl" alt="" />
          <span class="text">{{ item.updateFrequency }}</span>
          <!-- 遮罩层 -->
          <span
            class="shadow"
            v-show="isMouseMove && currentIndex === item.id"
          ></span>
          <!-- 播放按钮 -->
          <span
            class="play"
            v-show="isMouseMove && currentIndex === item.id"
            @click.stop="playClick(item.id)"
            ><i class="bi bi-play-circle-fill"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatNum } from "@/common/listenCount";
// 接口请求
import { getBoard } from "@/api/findMusic/leaderboard/leaderboard";
export default {
  name: "Leaderboard",
  // components: {
  //   LeaderBoradItem,
  // },
  data() {
    return {
      // 榜单推荐
      commendBoard: [],

      // 官方
      publicBoard: [],

      // 精选
      pickedBoard: [],

      // 曲风
      styleBoard: [],

      // 全球
      globaBoard: [],

      // 语种榜
      languageBoard: [],

      // 特色榜
      featuredBoard: [],

      // 保存所有榜单
      boardList: [],
      currentIndex: null,
      isMouseMove: false,
    };
  },
  methods: {
    playClick(id) {
      console.log("点击"+id);
    },
    // 进入歌单详情页
    openDetail(id) {
      this.$router.push({
        path: "/monaddetail",
        query: { id: id },
      });
      console.log("歌单页" + id);
    },
    // 获取所有榜单
    async getBoardBy() {
      await getBoard().then((res) => {
        this.boardList = res.list;
        console.log(this.boardList);
        // 筛选"榜单推荐"
        this.commendBoard = this.boardList.filter((e) => {
          return (
            e.name === "美国Billboard榜" ||
            e.name === "云音乐欧美新歌榜" ||
            e.name === "UK排行榜周榜"
          );
        });
        console.log(this.commendBoard);
        // 筛选"官方榜"
        this.publicBoard = this.boardList.slice(0, 4);
        console.log(this.publicBoard);
        // 筛选"精选榜"
        this.pickedBoard = this.boardList.filter((e) => {
          return (
            e.name === "蛋仔派对听歌榜" ||
            e.name === "网络热歌榜" ||
            e.name === "赏音榜" ||
            e.name === "黑胶VIP新歌榜"
          );
        });
        console.log(this.pickedBoard);
        // 筛选曲风
        this.styleBoard = this.boardList.filter((e) => {
          return (
            e.name === "中文DJ榜" ||
            e.name === "云音乐国风榜" ||
            e.name === "云音乐古典榜" ||
            e.name === "云音乐民谣榜" ||
            e.name === "云音乐摇滚榜" ||
            e.name === "云音乐ACG榜" ||
            e.name === "云音乐说唱榜" ||
            e.name === "云音乐电音榜" ||
            e.name === "欧美R&B榜"
          );
        });
        console.log(this.styleBoard);
        // 筛选全球
        this.globaBoard = this.boardList.filter((e) => {
          return (
            e.name === "美国Billboard榜" ||
            e.name === "UK排行榜周榜" ||
            e.name === "日本Oricon榜" ||
            e.name === "法国 NRJ Vos Hits 周榜" ||
            e.name === "Beatport全球电子舞曲榜" ||
            e.name === "俄罗斯top hit流行音乐榜"
          );
        });
        console.log(this.globaBoard);
        // 筛选语种
        this.languageBoard = this.boardList.filter((e) => {
          return (
            e.name === "云音乐欧美热歌榜" ||
            e.name === "云音乐欧美新歌榜" ||
            e.name === "云音乐日语榜" ||
            e.name === "云音乐韩语榜" ||
            e.name === "俄语榜" ||
            e.name === "泰语榜" ||
            e.name === "越南语榜"
          );
        });
        console.log(this.languageBoard);
        // 筛选特色
        this.featuredBoard = this.boardList.filter((e) => {
          return (
            e.name === "Suno AI新歌榜" ||
            e.name === "KTV唛榜" ||
            e.name === "潜力爆款榜" ||
            e.name === "听歌识曲榜" ||
            e.name === "BEAT排行榜" ||
            e.name === "LOOK直播歌曲榜"
          );
        });
        console.log(this.featuredBoard);
      });
    },
  },
  created() {
    this.getBoardBy();
  },
};
</script>

<style lang="less" scoped>
#Leader {
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
          right: 8px;
          font-size: 45px;
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
}
</style>
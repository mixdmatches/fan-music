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

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
// 接口请求
import { getBoard } from "@/api/findMusic/leaderboard/leaderboard";

const router = useRouter();

// 各分类榜单
const commendBoard = ref([]);
const publicBoard = ref([]);
const pickedBoard = ref([]);
const styleBoard = ref([]);
const globaBoard = ref([]);
const languageBoard = ref([]);
const featuredBoard = ref([]);
const currentIndex = ref(null);
const isMouseMove = ref(false);

// 点击播放
const playClick = (id) => {
  console.log("点击" + id);
};
// 进入歌单详情页
const openDetail = (id) => {
  router.push({ path: "/monaddetail", query: { id } });
};
// 获取榜单并按分类筛选
const getBoardBy = async () => {
  const res = await getBoard();
  const boardList = res.list;
  commendBoard.value = boardList.filter(
    (e) =>
      e.name === "美国Billboard榜" ||
      e.name === "云音乐欧美新歌榜" ||
      e.name === "UK排行榜周榜"
  );
  publicBoard.value = boardList.slice(0, 4);
  pickedBoard.value = boardList.filter(
    (e) =>
      e.name === "蛋仔派对听歌榜" ||
      e.name === "网络热歌榜" ||
      e.name === "赏音榜" ||
      e.name === "黑胶VIP新歌榜"
  );
  styleBoard.value = boardList.filter(
    (e) =>
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
  globaBoard.value = boardList.filter(
    (e) =>
      e.name === "美国Billboard榜" ||
      e.name === "UK排行榜周榜" ||
      e.name === "日本Oricon榜" ||
      e.name === "法国 NRJ Vos Hits 周榜" ||
      e.name === "Beatport全球电子舞曲榜" ||
      e.name === "俄罗斯top hit流行音乐榜"
  );
  languageBoard.value = boardList.filter(
    (e) =>
      e.name === "云音乐欧美热歌榜" ||
      e.name === "云音乐欧美新歌榜" ||
      e.name === "云音乐日语榜" ||
      e.name === "云音乐韩语榜" ||
      e.name === "俄语榜" ||
      e.name === "泰语榜" ||
      e.name === "越南语榜"
  );
  featuredBoard.value = boardList.filter(
    (e) =>
      e.name === "Suno AI新歌榜" ||
      e.name === "KTV唛榜" ||
      e.name === "潜力爆款榜" ||
      e.name === "听歌识曲榜" ||
      e.name === "BEAT排行榜" ||
      e.name === "LOOK直播歌曲榜"
  );
};

onMounted(getBoardBy);
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
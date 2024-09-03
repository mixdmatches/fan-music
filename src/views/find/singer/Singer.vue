<template>
  <div id="singer">
    <TabNav :tagList="tagsType.list" @tabItemClick="tagTypeClick"></TabNav>
    <TabNav :tagList="tagsArea.list" @tabItemClick="tagAreaClick"></TabNav>
    <TabNavNav
      :tagList="initialTags.list"
      @tagClick="tagInitialClick"
    ></TabNavNav>
    <div class="singerView">
      <div class="singerItem" v-for="(item, index) in singerList" :key="index">
        <img v-lazy="item.img1v1Url" alt="" />
        <span>{{ item.name }}</span>
        <p>单曲:{{ item.musicSize }}</p>
      </div>
    </div>
  </div>
</template>

<script>
// 请求网络
import { getSingerList } from "@/api/findMusic/singer/singer";
// 导入组件
import TabNavNav from "@/components/TabNavNav.vue";
import TabNav from "@/components/TabNav.vue";
export default {
  name: "Singer",
  components: {
    TabNav,
    TabNavNav,
  },
  data() {
    return {
      tagsType: {
        category: "语种",
        list: [
          { type: -1, name: "全部" },
          { type: 1, name: "男歌手" },
          { type: 2, name: "女歌手" },
          { type: 3, name: "乐队" },
        ],
      },
      tagsArea: {
        category: "地区",
        list: [
          { area: -1, name: "全部" },
          { area: 7, name: "华语" },
          { area: 96, name: "欧美" },
          { area: 8, name: "日本" },
          { area: 16, name: "韩国" },
          { area: 0, name: "其他" },
        ],
      },
      initialTags: {
        category: "首字母",
        list: [
          { initial: -1, name: "热门" },
          { initial: "a", name: "A" },
          { initial: "b", name: "B" },
          { initial: "c", name: "C" },
          { initial: "d", name: "D" },
          { initial: "e", name: "E" },
          { initial: "f", name: "F" },
          { initial: "g", name: "G" },
          { initial: "h", name: "H" },
          { initial: "i", name: "I" },
          { initial: "j", name: "J" },
          { initial: "k", name: "K" },
          { initial: "l", name: "L" },
          { initial: "m", name: "M" },
          { initial: "n", name: "N" },
          { initial: "o", name: "O" },
          { initial: "p", name: "P" },
          { initial: "q", name: "Q" },
          { initial: "r", name: "R" },
          { initial: "s", name: "S" },
          { initial: "t", name: "T" },
          { initial: "u", name: "U" },
          { initial: "v", name: "V" },
          { initial: "w", name: "W" },
          { initial: "x", name: "X" },
          { initial: "y", name: "Y" },
          { initial: "z", name: "Z" },
          { initial: 0, name: "#" },
        ],
      },
      area: -1,
      type: -1,
      initial: -1,
      singerList: [],
    };
  },
  methods: {
    getSingerListBy(limit, type, area, initial) {
      getSingerList(limit, type, area, initial).then((res) => {
        this.singerList = res.artists;
      });
    },
    tagTypeClick(item) {
      this.type = item.type;
      this.getSingerListBy(60, this.type, this.area, this.initial);
    },
    tagAreaClick(item) {
      this.area = item.area;
      this.getSingerListBy(60, this.type, this.area, this.initial);
    },
    tagInitialClick(item) {
      this.initial = item.initial;
      this.getSingerListBy(60, this.type, this.area, this.initial);
    },
  },
  created() {
    this.getSingerListBy(60, this.type, this.area, this.initial);
  },
};
</script>

<style lang="less" scoped>
#singer {
  .singerView {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    .singerItem {
      position: relative;
      width: 167px;
      height: 230px;
      border-radius: 10px;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      img {
        width: 80%;
        border-radius: 50%;
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
  }
}
</style>
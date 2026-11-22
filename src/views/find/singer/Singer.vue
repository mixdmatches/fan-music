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

<script setup>
import { ref, onMounted } from "vue";
// 请求网络
import { getSingerList } from "@/api/findMusic/singer/singer";
// 导入组件
import TabNavNav from "@/components/TabNavNav.vue";
import TabNav from "@/components/TabNav.vue";

const tagsType = {
  category: "语种",
  list: [
    { type: -1, name: "全部" },
    { type: 1, name: "男歌手" },
    { type: 2, name: "女歌手" },
    { type: 3, name: "乐队" },
  ],
};
const tagsArea = {
  category: "地区",
  list: [
    { area: -1, name: "全部" },
    { area: 7, name: "华语" },
    { area: 96, name: "欧美" },
    { area: 8, name: "日本" },
    { area: 16, name: "韩国" },
    { area: 0, name: "其他" },
  ],
};
const initialTags = {
  category: "首字母",
  list: [
    { initial: -1, name: "热门" },
    ..."abcdefghijklmnopqrstuvwxyz".split("").map((l) => ({
      initial: l,
      name: l.toUpperCase(),
    })),
    { initial: 0, name: "#" },
  ],
};

const area = ref(-1);
const type = ref(-1);
const initial = ref(-1);
const singerList = ref([]);

// 按条件请求歌手列表
const getSingerListBy = (limit, type, area, initial) => {
  getSingerList(limit, type, area, initial).then((res) => {
    singerList.value = res.artists;
  });
};
// 切换语种
const tagTypeClick = (item) => {
  type.value = item.type;
  getSingerListBy(60, type.value, area.value, initial.value);
};
// 切换地区
const tagAreaClick = (item) => {
  area.value = item.area;
  getSingerListBy(60, type.value, area.value, initial.value);
};
// 切换首字母
const tagInitialClick = (item) => {
  initial.value = item.initial;
  getSingerListBy(60, type.value, area.value, initial.value);
};

onMounted(() => getSingerListBy(60, type.value, area.value, initial.value));
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
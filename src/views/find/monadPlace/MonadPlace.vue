<template>
  <div id="monad">
    <div class="tabNav">
      <span
        class="tab"
        v-for="(item, index) in tabNav"
        :key="index"
        :class="{ text: route.path === item.path }"
        @click="router.push(item.path)"
        >{{ item.name }}</span
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// 歌单广场分类导航
const tabNav = [
  { name: "推荐", path: "/find/monadplace/commend" },
  { name: "华语", path: "/find/monadplace/chinese" },
  { name: "摇滚", path: "/find/monadplace/rock" },
  { name: "民谣", path: "/find/monadplace/ballad" },
  { name: "电子", path: "/find/monadplace/electronic" },
  { name: "轻音乐", path: "/find/monadplace/lightMusic" },
];
</script>

<style lang="less" scoped>
.tabNav {
  span {
    padding: 5px 15px 5px 15px;
    border-radius: 30px;
    border: 1px solid #ccc;
    font-size: 12px;
    color: rgb(120, 127, 141);
    margin-right: 10px;
  }
  .text {
    background-color: rgb(248, 234, 237);
    color: rgb(255, 58, 58);
    border: 1px solid #ffbebe;
  }
}
</style>
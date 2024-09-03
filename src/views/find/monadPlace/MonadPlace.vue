<template>
  <div id="monad">
    <div class="tabNav">
      <router-link
        active-class="text"
        tag="span"
        :to="item.path"
        class="tab"
        v-for="(item, index) in tabNav"
        :key="index"
        :class="{ text: $route.path === item.path }"
        >{{ item.name }}</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "MonadChoice",
  data() {
    return {
      clickTabPath: "",
      clickTabName: "",
      tabNav: [
        { name: "推荐", path: "/find/monadplace/commend" },
        { name: "华语", path: "/find/monadplace/chinese" },
        { name: "摇滚", path: "/find/monadplace/rock" },
        { name: "民谣", path: "/find/monadplace/ballad" },
        { name: "电子", path: "/find/monadplace/electronic" },
        { name: "轻音乐", path: "/find/monadplace/lightmusic" },
      ],
    };
  },
};
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
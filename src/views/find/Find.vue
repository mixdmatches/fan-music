<template>
  <div>
    <!-- 官方推荐 -->
    <div class="commend">
      <!-- 头部 -->
      <div class="header">
        <router-link
          active-class="text"
          :to="item.path"
          tag="span"
          v-for="(item, index) in headerNavBar"
          :key="index"
          :class="{ text: $route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Find",
  data() {
    return {
      headerNavBar: [
        { name: "精选", path: "/find/coiffed" },
        { name: "歌单广场", path: "/find/monadplace" },
        { name: "排行榜", path: "/find/leaderboard" },
        { name: "歌手", path: "/find/singer" },
        // { name: "VIP", path: "/find/vip" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.commend {
  // 头部
  .header {
    height: 60px;
    align-items: center;
    display: flex;
    gap: 20px;
    // border-bottom: 1px solid #ccc;

    .text {
      color: #000000;
      font-size: 16px;
      font-weight: 400;
    }
    span {
      color: #787f8d;
      font-size: 14px;
      font-weight: lighter;
    }
  }
}
</style>
<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script>
import Aside from "@/Layout/Aside.vue";
export default {
  name: "Main",
  components: {
    Aside,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
#main {
  overflow-y: scroll;
  // text-align: center;
  grid-area: content;
  background-color: var(--base-main);
  padding: 0 20px 0 20px;
}
</style>
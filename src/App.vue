<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>
    <!-- 侧边 -->
    <Aside></Aside>
    <!-- 主体 -->
    <Main> </Main>
    <!-- 底部 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/Layout/Header.vue";
import Footer from "@/Layout/Footer.vue";
import Aside from "@/Layout/Aside.vue";
import Main from "@/Layout/Main.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Aside,
    Main,
  },
};
</script>

<style lang="less">
@import "assets/css/base.css";
#app {
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar content content"
    "footer footer footer";
  height: 100vh;
}
</style>

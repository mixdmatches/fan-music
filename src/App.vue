<template>
  <div class="app-layout">
    <!-- 头部 -->
    <Header />
    <!-- 侧边 -->
    <Aside />
    <!-- 主体 -->
    <Main />
    <!-- 底部 -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/Layout/Header.vue'
import Aside from '@/Layout/Aside.vue'
import Main from '@/Layout/Main.vue'
import Footer from '@/Layout/Footer.vue'
</script>

<style lang="less">
.app-layout {
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  grid-template-areas:
    'sidebar header header'
    'sidebar content content'
    'footer footer footer';
  height: 100vh;
}
</style>

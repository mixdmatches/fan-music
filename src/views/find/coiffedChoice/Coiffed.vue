<template>
  <div id="coiffed">
    <!-- 三图轮播 -->
    <!-- <div class="rotation">
      <img src="@/assets/images/b1.jpg" alt="" />
      <img src="@/assets/images/b2.jpg" alt="" />
      <img src="@/assets/images/b3.jpg" alt="" />
    </div> -->
    <!-- 官方歌单 -->
    <AuthorityPlay></AuthorityPlay>
    <!-- 最新音乐 -->
    <NewMusicList></NewMusicList>
  </div>
</template>

<script setup>
import AuthorityPlay from "./authorityPlayList/AuthorityPlay.vue";
import NewMusicList from "./newMusic/NewMusicList.vue";
</script>

<style lang="less" scoped>
// 三图轮播
.rotation {
  display: flex;
  /* 开启flex布局 */
  justify-content: space-between;

  /* 水平方向上两边对齐 */
  img {
    width: 390px;
    border-radius: 8px;
  }
}
</style>
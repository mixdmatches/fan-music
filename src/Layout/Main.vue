<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
#main {
  overflow-y: scroll;
  // text-align: center;
  grid-area: content;
  background-color: var(--base-main);
  padding: 0 20px 0 20px;
}
</style>
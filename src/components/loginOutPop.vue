<template>
  <div v-if="show">退出登录弹窗</div>
</template>

<script>
export default {
  name: "loginOutPop",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
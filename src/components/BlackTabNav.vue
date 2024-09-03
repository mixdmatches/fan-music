<template>
  <!-- 黑色单文字导航栏 -->
  <div class="header">
    <span
      v-for="(item, index) in TypeList"
      :key="index"
      @click="tabItemClick(index, item)"
      :class="{ text: currentIndex === index }"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: "BlackTabNav",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    TypeList: {
      type: Array,
    },
  },
  methods: {
    tabItemClick(index, item) {
      this.currentIndex = index;
      this.$emit("tabClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
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
</style>
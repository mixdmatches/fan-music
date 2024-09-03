<template>
  <!-- 方圆形红色导航栏 -->
  <div class="tabNav">
    <span
      class="tab"
      v-for="(item, index) in tagList"
      :key="index"
      @click="tabItemClick(index, item)"
      :class="{ text: currentIndex === index }"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: "TabNav",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    tabItemClick(index, item) {
      this.currentIndex = index;
      this.$emit("tabItemClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
.tabNav {
  margin-bottom: 15px;
  span {
    width: 60px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    display: inline-block;
    // padding: 5px 15px 5px 15px;
    border-radius: 30px;
    border: 1px solid #ccc;
    font-size: 12px;
    color: rgb(120, 127, 141);
    margin-right: 10px;
    font-weight: lighter;
  }
  .text {
    background-color: rgb(248, 234, 237);
    color: rgb(255, 58, 58);
    border: 1px solid #ffbebe;
  }
}
</style>
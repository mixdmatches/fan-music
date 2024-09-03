<template>
  <!-- 歌手首字母排列abcd分类 -->
  <div class="tag">
    <span
      v-for="(item, index) in tagList"
      :key="index"
      :class="{ text: currentIndex === index }"
      @click="tagClick(index, item)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: "TabNavNav",
  props: {
    tagList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tagClick(index, item) {
      this.currentIndex = index;
      this.$emit("tagClick", item);
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  // margin-left: 10px;
  display: flex;
  gap: 20px;
  span {
    font-size: 12px;
    color: rgb(40, 50, 72);
  }
  .text {
    color: rgb(255, 58, 58);
  }
}
</style>
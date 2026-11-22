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

<script setup>
import { ref } from "vue";

defineProps({
  tagList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["tagClick"]);

const currentIndex = ref(0);

// 点击首字母标签，向外抛出选中项
const tagClick = (index, item) => {
  currentIndex.value = index;
  emit("tagClick", item);
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
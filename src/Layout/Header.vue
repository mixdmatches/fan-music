<template>
  <div id="header">
    <div class="header-left">
      <span class="back" @click="goBack">
        <i class="bi bi-arrow-left"></i>
      </span>
      <span class="back" @click="goIn">
        <i class="bi bi-arrow-right"></i>
      </span>
      <input v-model="keyWord" type="text" placeholder="输入文本" />
      <span class="search" @click="goPush(keyWord)">
        <i class="bi bi-search"></i>
      </span>
    </div>
    <div class="header-right">
      <span v-if="userInfo" @click="showLoginOut" class="work">退出登录</span>
      <img
        @click="showLogin"
        :src="userInfo ? userInfo.avatarUrl : singerload"
        alt=""
      />
      <p @click="showLogin">
        {{ userInfo ? userInfo.nickname : "未登录" }}
      </p>
      <span class="mail">
        <i class="bi bi-bell"></i>
      </span>
      <span class="setting">
        <i class="bi bi-gear"></i>
      </span>
      <span class="skin" @click="changeTheme">
        <i class="bi bi-moon"></i>
      </span>
    </div>
    <transition name="el-fade-in-linear">
      <LoginModal v-if="showLoginModal" @closeLogin="closeLogin"></LoginModal>
    </transition>
    <transition name="el-fade-in-linear">
      <LoginOutPop v-if="showOut" @closeLoginOut="closeLoginOut"></LoginOutPop>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";
// 引入登录弹窗组件
import LoginModal from "@/components/LoginModal.vue";
import LoginOutPop from "@/components/LoginOutPop.vue";
// 头像占位图
import singerload from "@/assets/images/singerload.png";

const router = useRouter();
const userStore = useUserStore();
const { userInfo, isLogin } = storeToRefs(userStore);

// 搜索词与弹窗显隐
const keyWord = ref("");
const showLoginModal = ref(false);
const showOut = ref(false);

// 切换主题
const changeTheme = () => {
  const theme = userStore.theme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  userStore.changeTheme(theme);
  userStore.changeLogo(
    theme === "light"
      ? "@/assets/images/logo-light.png"
      : "@/assets/images/logo-dark.png"
  );
};
// 返回 / 前进
const goBack = () => router.go(-1);
const goIn = () => router.go(1);
// 搜索
const goPush = (keyword) => {
  if (keyword === "") return;
  router.push({ path: "/search", query: { keyword } });
};
// 打开登录弹窗（已登录则不弹）
const showLogin = () => {
  if (isLogin.value) return;
  showLoginModal.value = true;
};
// 关闭登录弹窗
const closeLogin = () => {
  showLoginModal.value = false;
};
// 打开退出弹窗
const showLoginOut = () => {
  showOut.value = true;
};
// 关闭退出弹窗
const closeLoginOut = () => {
  showOut.value = false;
};
</script>

<style lang="less" scoped>
// 顶部
#header {
  position: relative;
  text-align: center;
  grid-area: header;
  background-color: var(--base-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  // div {
  //   display: flex;
  //   align-items: center;
  //   width: 300px;
  //   height: 60%;
  //   gap: 8px;
  // }

  // 顶部左边
  .header-left {
    display: flex;
    align-items: center;
    width: 300px;
    height: 60%;
    // justify-content: center;
    gap: 8px;
    .back {
      display: flex;
      width: 20px;
      height: 28px;
      border-radius: 6px;
      border: 1px solid #ccc;
      align-items: center;
      justify-content: center;

      i {
        color: #ccc;
      }
    }

    input {
      font-weight: lighter;
      height: 30px;
      width: 200px;
      border-style: none;
      border-radius: 8px;
      background: linear-gradient(to right, #e6f9ff, #f6f2ff, #ffeefa);
      outline: none;
      font-size: 12px;
      /* 移除焦点时的边框 */
      border: 1px solid transparent;
      /* 透明边框，以便显示渐变效果 */
      text-indent: 10px;
      /* 向右移动文本5像素 */
      color: rgb(64, 73, 94);
    }

    .search {
      display: flex;
      width: 25px;
      height: 30px;
      border-radius: 5px;
      // border: 1px solid #ccc;
      align-items: center;
      justify-content: center;
      background-color: #ffeefa;

      i {
        color: #ccc;
      }
    }
  }

  // 顶部右边
  .header-right {
    display: flex;
    align-items: center;
    // width: 300px;
    height: 60%;
    gap: 8px;
    cursor: pointer;
    justify-content: right;
    img {
      width: 20px;
      height: 20px;
      border-radius: 10px;
    }

    p {
      font-size: 12px;
      font-weight: lighter;
      color: #787f8d;
    }

    .work {
      font-size: 12px;
    }
    span {
      color: #787f8d;
    }
  }
}
</style>
<template>
  <div id="header">
    <div class="header-left">
      <span class="back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="back" @click="goIn">
        <i class="el-icon-arrow-right"></i>
      </span>
      <input v-model="keyWord" type="text" placeholder="输入文本" />
      <span class="search" @click="goPush(keyWord)">
        <i class="el-icon-search"></i>
      </span>
    </div>
    <div class="header-right">
      <span v-if="userInfo" @click="showLoginOut" class="work">退出登录</span>
      <img
        @click="showLogin"
        v-bind:src="
          userInfo
            ? userInfo.avatarUrl
            : require('@/assets/images/singerload.png')
        "
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

<script>
import { loginOut, loginStatus } from "@/api/login/login";
// 引入登录弹窗组件
import LoginModal from "@/components/LoginModal.vue";
import LoginOutPop from "@/components/LoginOutPop.vue";
// vuex
import { mapGetters } from "vuex";
import { userInfo } from "@/store/getters";
export default {
  name: "Header",
  components: {
    LoginModal,
    LoginOutPop,
  },
  data() {
    return {
      // 搜索词
      keyWord: "",
      showLoginModal: false,
      showOut: false,
    };
  },
  computed: {
    ...mapGetters(["isPlaying", "userInfo", "isLogin"]),
  },
  methods: {
    // 切换主题
    changeTheme() {
      console.log("切换主题");
      let theme = this.$store.state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      this.$store.dispatch("changeTheme", theme);
      if (theme === "light") {
        this.$store.dispatch("changeLogo", "@/assets/images/logo-light.png");
        console.log("改变logo");
      } else {
        this.$store.dispatch("changeLogo", "@/assets/images/logo-dark.png");
      }
    },
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 前进
    goIn() {
      this.$router.go(1);
    },
    // 搜索
    goPush(keyWord) {
      if (keyWord === "") {
        return;
      }

      // params
      // this.$router.push({
      //   name: "Search",
      //   params: { keyword: keyWord },
      // });
      // query
      this.$router.push({
        path: "/search",
        query: { keyword: keyWord },
      });
    },
    
    // 控制登录弹窗出现
    showLogin() {
      // 如果已经登录
      if (this.isLogin) {
        return;
      }
      // 没有的话
      this.showLoginModal = true;
    },
    // 控制登录弹窗关闭
    closeLogin(){
      this.showLoginModal = false;
    },
    // 控制退出弹窗出现
    showLoginOut() {
      this.showOut = true;
    },
    // 退出弹窗关闭
    closeLoginOut() {
      this.showOut = false;
    },
  },
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
<template>
  <div class="out-overlay">
    <div class="out">
      <div class="hd">
        <span class="title">退出登录</span>
        <span class="close" @click="close">
          <i class="bi bi-x"></i>
        </span>
      </div>

      <div class="content">是否退出登录？</div>

      <div class="work">
        <button @click="close">取消</button>
        <button @click="loginOut">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginOut } from "@/api/login/login";
export default {
  name: "LoginOutPop",
  data() {
    return {
      // show: false,
    };
  },
  // props: {
  //   show: {
  //     type: Boolean,
  //   },
  // },
  methods: {
    // 关闭弹窗
    close() {
      this.$emit("closeLoginOut");
    },
    // 退出登录
    async loginOut() {
      console.log("退出登录");
      localStorage.removeItem("cookie");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLogin");
      await loginOut().then((res) => {
        console.log(res);
      });
      location.reload();
      this.$message("已退出");
    },
  },
};
</script>

<style lang="less" scoped>
.out-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .out {
    width: 400px;
    height: 150px;
    background: rgb(240, 243, 246);
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    .hd {
      display: flex;
      justify-content: space-between;
      .close {
        font-size: 18px;
      }
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .work {
      display: flex;
      justify-content: end;
      button {
        padding: 10px;
        margin-left: 10px;
        border-radius: 10px;
        border: 1px solid rgb(252, 61, 75);
        font-size: 12px;
        background: rgb(247, 249, 252);
      }
      button:nth-last-child(1) {
        background: rgb(252, 61, 75);
        color: white;
      }
      button:nth-last-child(2):hover {
        background: #ff1c1c36;
        color: white;
      }
    }
  }
}
</style>
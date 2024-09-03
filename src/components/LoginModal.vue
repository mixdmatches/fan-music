<template>
  <div v-if="show" class="login-modal">
    <!-- 手机号登陆 -->
    <div class="login1" v-if="!QRway">
      <div class="top">
        <span @click="QRlogin">扫二维码</span>
        <span class="close" @click="close">关闭</span>
      </div>
      <div class="modal-content">
        <h2>登录</h2>
        <form>
          <div class="phone">
            <input
              type="text"
              id="phone"
              v-model="phoneNumber"
              placeholder="请输入手机号"
            />
          </div>
          <!-- 验证码登录 -->
          <div class="captcha">
            <input
              id="captcha"
              v-model="captcha"
              placeholder="请输入验证码
          "
            />
            <button class="code" @click="getCodeBy">
              {{ second === totalSencond ? "获取验证码" : second }}
            </button>
          </div>
          <!-- 切换验证/密码登录 -->
          <!-- <div class="status">
            <span></span>
            <span @click="isPassWord = !isPassWord">{{
              isPassWord ? "验证码登录" : "密码登录"
            }}</span>
          </div> -->
          <button type="submit" class="submit" @click="login">登录</button>
        </form>
      </div>
    </div>
    <!-- 扫二维码登录 -->
    <div class="login2" v-if="QRway">
      <div class="top">
        <span class="phonelogin" @click="QRway = false">手机号登陆 ></span>
        <span class="close" @click="close">关闭</span>
      </div>
      <div class="modal-content">
        <h2>扫码登录</h2>
        <img :src="this.qrimg" @click="QRlogin" alt="" />
        <p>使用app扫码登陆</p>
      </div>
    </div>
  </div>
</template>

<script>
// api
import {
  getCode,
  validate,
  getKey,
  getqrimg,
  getStatusCode,
  getUserInfo,
  phoneLogin,
  loginStatus,
} from "@/api/login/login";
import { getUserDetail } from "@/api/user/user";
export default {
  name: "LoginModal",
  data() {
    return {
      type: 0, //0:密码登录 1：验证码 2.二维码
      show: false,
      phoneNumber: "", //手机号
      captcha: "", //验证码
      password: "", //密码
      totalSencond: 60, // 总秒数
      second: 60, // 当前秒数,开定时器对second
      timer: null,
      QRway: false, //二维码登录？
      qrimg: "",
      timerStatus: null,
    };
  },
  methods: {
    // 关闭窗口
    close() {
      if (this.timerStatus) {
        clearInterval(this.timerStatus);
      }
      this.show = false;
    },
    // 验证手机号格式
    vailFn() {
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        this.$message.error("手机号格式错误");
        return false;
      }
      return true;
    },
    // 获取验证码
    async getCodeBy() {
      // 验证表单
      if (!this.vailFn()) {
        return;
      }
      // 开启定时器
      if (!this.timer && this.second === this.totalSencond) {
        this.$message({
          message: "发送成功，请注意接收",
          type: "success",
        });
        // 调用api
        var ress;
        await getCode(this.phoneNumber).then((res) => {
          ress = res;
          if (ress.message) {
            this.$message({
              showClose: true,
              message: ress.message,
            });
          }
        });
        if (ress.data) {
          this.timer = setInterval(() => {
            console.log("正在倒计时");
            this.second--;
            if (this.second <= 0) {
              clearInterval(this.timer);
              this.timer = null; // 重置
              this.second = this.totalSencond; // 归位
            }
          }, 1000);
        }
      }
    },
    // 校验验证码
    vailCode() {
      var result;
      if (this.captcha === "") {
        this.$message.error("未输入验证码");
        return false;
      } else {
        // 验证验证码是否正确
        validate(this.phoneNumber, this.captcha).then((res) => {
          console.log(res);
          result = res.data;
          console.log(result);
        });
      }
      if (result) {
        this.$message.error("验证码错误");
        return false;
      }
      return true;
    },
    // 获取账号信息
    getUserAccount() {
      var uid;
      getUserInfo().then((res) => {
        console.log(res);
        console.log(res.account);
        uid = res.account.id;
      });
      getUserDetail(uid).then((res) => {
        this.$store.commit("saveUserInfo", res.profile);
      });
    },
    // 登录
    login() {
      var cookie = localStorage.getItem("cookie");
      this.getLoginStatus(cookie);
      // 校验手机号
      if (!this.vailFn()) {
        return;
      }
      if (!this.vailCode()) {
        return;
      }
      // 成功后获取用户信息
      this.getUserAccount();
      this.$store.commit("updateLogin", true);
      this.$message({
        message: "登陆成功",
        type: "success",
      });
      this.phoneNumber = "";
      this.captcha = "";
      clearInterval(this.timerStatus);
      // this.getLoginStatus(cookiee);
      // localStorage.setItem("cookie", cookiee);
      this.close();
    },
    // 二维码
    async QRlogin() {
      // clearInterval(this.timerStatus);
      var cookie = localStorage.getItem("cookie");
      this.getLoginStatus(cookie);
      this.QRway = true;
      var key;
      // 获取key
      await getKey().then((res) => {
        key = res.data.unikey;
      });
      await getqrimg(key).then((res) => {
        this.qrimg = res.data.qrimg;
      });

      var status;
      var cookiee;
      this.timerStatus = setInterval(async () => {
        await getStatusCode(key).then((res) => {
          status = res.code;
          cookiee = res.cookie;
        });
        if (status === 800) {
          this.$message("二维码已过期,点击二维码重新获取");
          clearInterval(this.timerStatus);
        }
        if (status === 803) {
          // 这一步会返回cookie
          clearInterval(this.timerStatus);
          this.getLoginStatus(cookiee);
          localStorage.setItem("cookie", cookiee);
          this.close();
          this.$store.commit("updateLogin", true);
          this.$message({
            message: "授权登录成功",
            type: "success",
          });
        }
      }, 3000);
    },
    // 登陆状态
    async getLoginStatus(cookie = "") {
      await loginStatus(cookie).then((res) => {
        console.log("res.data:", res.data);
        this.$store.commit("saveUserInfo", res.data.profile);
      });
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.login-modal {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: fixed;
  top: 20%;
  left: 40%;
  width: 350px;
  height: 400px;
  background-color: var(--base-aside);
  display: flex;
  flex-direction: column;
  z-index: 2;
  .top {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .close {
      display: flex;
      justify-content: flex-end;
    }
  }
  .modal-content {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-radius: 4px;
    align-items: center;
    h2 {
      font-weight: normal;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: center;
      width: 100%;
      .phone {
        width: 70%;
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
      }
      .captcha {
        display: flex;
        width: 70%;
        #captcha {
          width: 65%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .code {
          width: 35%;
          white-space: nowrap;
          margin-left: 5px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
          font-size: 12px;
          text-align: center;
        }
      }
      .password {
        width: 70%;
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
      }
      .status {
        width: 70%;
        display: flex;
        justify-content: space-between;
        span {
          font-size: 12px;
        }
      }
      .submit {
        width: 70%;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        background-color: rgb(252, 61, 75);
        color: white;
      }
    }
  }
}
</style>
 
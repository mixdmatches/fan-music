<template>
  <div class="login-overlay">
    <div class="login-modal">
      <!-- 手机号登陆 -->
      <div class="login1" v-if="!QRway">
        <div class="top">
          <span @click="QRlogin">扫二维码</span>
          <span class="close" @click="close">
            <i class="bi bi-x"></i>
          </span>
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
          <span class="close" @click="close">
            <i class="bi bi-x"></i>
          </span>
        </div>
        <div class="modal-content">
          <h2>扫码登录</h2>
          <img :src="qrimg" @click="QRlogin" alt="" />
          <p>使用app扫码登陆</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
// api
import {
  getCode,
  validate,
  getKey,
  getqrimg,
  getStatusCode,
  getUserInfo,
  loginStatus,
} from "@/api/login/login";
import { getUserDetail } from "@/api/user/user";

const emit = defineEmits(["closeLogin"]);
const userStore = useUserStore();

const phoneNumber = ref(""); // 手机号
const captcha = ref(""); // 验证码
const totalSencond = ref(60); // 总秒数
const second = ref(60); // 当前秒数
const timer = ref(null);
const QRway = ref(false); // 二维码登录？
const qrimg = ref("");
const timerStatus = ref(null);

// 关闭窗口
const close = () => {
  clearInterval(timerStatus.value);
  emit("closeLogin");
};
// 验证手机号格式
const vailFn = () => {
  if (!/^1[3-9]\d{9}$/.test(phoneNumber.value)) {
    ElMessage.error("手机号格式错误");
    return false;
  }
  return true;
};
// 获取验证码
const getCodeBy = async () => {
  if (!vailFn()) return;
  if (!timer.value && second.value === totalSencond.value) {
    ElMessage({ message: "发送成功，请注意接收", type: "success" });
    let ress;
    await getCode(phoneNumber.value).then((res) => {
      ress = res;
      if (ress.message) {
        ElMessage({ showClose: true, message: ress.message });
      }
    });
    if (ress.data) {
      timer.value = setInterval(() => {
        second.value--;
        if (second.value <= 0) {
          clearInterval(timer.value);
          timer.value = null;
          second.value = totalSencond.value;
        }
      }, 1000);
    }
  }
};
// 校验验证码
const vailCode = () => {
  let result;
  if (captcha.value === "") {
    ElMessage.error("未输入验证码");
    return false;
  }
  validate(phoneNumber.value, captcha.value).then((res) => {
    result = res.data;
  });
  if (result) {
    ElMessage.error("验证码错误");
    return false;
  }
  return true;
};
// 获取账号信息
const getUserAccount = () => {
  let uid;
  getUserInfo().then((res) => {
    uid = res.account.id;
  });
  getUserDetail(uid).then((res) => {
    userStore.saveUserInfo(res.profile);
  });
};
// 登录
const login = () => {
  const cookie = localStorage.getItem("cookie");
  getLoginStatus(cookie);
  if (!vailFn()) return;
  if (!vailCode()) return;
  getUserAccount();
  userStore.updateLogin(true);
  ElMessage({ message: "登陆成功", type: "success" });
  phoneNumber.value = "";
  captcha.value = "";
  clearInterval(timerStatus.value);
  close();
};
// 二维码登录
const QRlogin = async () => {
  const cookie = localStorage.getItem("cookie");
  getLoginStatus(cookie);
  QRway.value = true;
  let key;
  await getKey().then((res) => {
    key = res.data.unikey;
  });
  await getqrimg(key).then((res) => {
    qrimg.value = res.data.qrimg;
  });

  let status;
  let cookiee;
  timerStatus.value = setInterval(async () => {
    await getStatusCode(key).then((res) => {
      status = res.code;
      cookiee = res.cookie;
    });
    if (status === 800) {
      ElMessage("二维码已过期,点击二维码重新获取");
      clearInterval(timerStatus.value);
    }
    if (status === 803) {
      // 这一步会返回cookie
      clearInterval(timerStatus.value);
      getLoginStatus(cookiee);
      localStorage.setItem("cookie", cookiee);
      close();
      userStore.updateLogin(true);
      ElMessage({ message: "授权登录成功", type: "success" });
    }
  }, 3000);
};
// 登陆状态
const getLoginStatus = async (cookie = "") => {
  await loginStatus(cookie).then((res) => {
    userStore.saveUserInfo(res.data.profile);
  });
};

onUnmounted(() => clearInterval(timer.value));
</script>

<style lang="less" scoped>
.login-overlay {
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
}
.login-modal {
  border-radius: 10px;
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
      font-size: 18px;
      cursor: pointer;
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
 
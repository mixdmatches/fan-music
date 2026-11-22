import { defineStore } from 'pinia'

// 安全读取 localStorage 中的 JSON，解析失败时返回默认值
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// 主题与用户相关状态
export const useUserStore = defineStore('user', {
  state: () => ({
    theme: read('theme', 'light'),
    logo: read('logo', '@/assets/images/logo-light.png'),
    isLogin: read('isLogin', false),
    userInfo: read('userInfo', null)
  }),
  actions: {
    // 切换主题
    changeTheme(theme) {
      this.theme = theme
      localStorage.setItem('theme', JSON.stringify(theme))
    },
    // 切换 logo
    changeLogo(logo) {
      this.logo = logo
      localStorage.setItem('logo', JSON.stringify(logo))
    },
    // 更新登录状态
    updateLogin(isLogin) {
      this.isLogin = isLogin
      localStorage.setItem('isLogin', JSON.stringify(isLogin))
    },
    // 保存用户信息
    saveUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  }
})

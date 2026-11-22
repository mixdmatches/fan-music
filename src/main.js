import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import { pinia } from './store'

// 全局样式
import '@/assets/css/theme.css'
import '@/assets/css/resetui.css'
import '@/assets/css/base.css'

// 懒加载的占位图与错误图
import loadingImg from '@/assets/images/loadImg.gif'
import errorImg from '@/assets/images/error.png'

const app = createApp(App)

app.use(ElementPlus)
app.use(VueLazyLoad, {
  loading: loadingImg,
  error: errorImg,
  attempt: 6,
  observer: true
})
app.use(pinia)
app.use(router)

// 等路由就绪后再挂载，避免首屏白屏
router.isReady().then(() => app.mount('#app'))

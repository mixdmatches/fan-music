import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css
import "@/assets/css/theme.css"
import '@/assets/css/resetui.css';
/**外部组件使用 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

/**使用图片懒加载**/
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: require("./assets/images//loadImg.gif"),
  error: require("./assets/images/error.png"),
  attempt: 6,
  observer: true,
});


/** 全局读取localStorage */
import { setInfo, getInfo, removeInfo } from "./utils/storage";
Vue.prototype.setInfo = setInfo;
Vue.prototype.getInfo = getInfo;
Vue.prototype.removeInfo = removeInfo;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// 设置默认路由
router.push('/find')

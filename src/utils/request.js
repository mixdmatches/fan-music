import axios from "axios";
import { Loading } from 'element-ui';
// import '@/assets/css/resetui.css';
//内存中正在请求的数量
let loadingNum = 0;
let loading
function startLoading() {
  if (loadingNum == 0) {
    loading = Loading.service({
      lock: true,
      text: '',
      background: 'rgba(0,0,0,0.5)',
      fullscreen: true,
      customClass: '.create-isLoading'
    })
  }
  //请求数量加1
  loadingNum++;
}
function endLoading() {
  //请求数量减1
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000
})

// 自定义配置--请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // const token = store.getters.token
  // if (token) {
  //   config.headers['Access-Token'] = token
  //   config.headers.platform = 'H5'
  // }
  startLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 错误情况
    // Toast(res.message)
    // return Promise.reject(res.message)
    endLoading()
  } else {
    // 成功情况
    // Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
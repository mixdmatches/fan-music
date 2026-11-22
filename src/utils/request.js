import axios from 'axios'
import { ElLoading } from 'element-plus'

// 内存中正在请求的数量
let loadingNum = 0
let loading

// 开始全屏 loading
function startLoading() {
  if (loadingNum === 0) {
    loading = ElLoading.service({
      lock: true,
      text: '',
      background: 'rgba(0,0,0,0.5)',
      fullscreen: true
    })
  }
  loadingNum++
}

// 结束全屏 loading
function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000
})

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export { startLoading, endLoading }
export default instance

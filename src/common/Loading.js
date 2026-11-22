import { ElLoading } from 'element-plus'

let loading

// 打开全屏 loading
export function startLoading(text = '拼命加载中...') {
  loading = ElLoading.service({
    lock: true,
    text,
    background: 'rgba(0,0,0,0)'
  })
}

// 关闭全屏 loading
export function endLoading() {
  loading?.close()
}

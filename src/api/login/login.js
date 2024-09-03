import request from "@/utils/request"
// 获取验证码
export const getCode = (phone, ctcode) => {
  return request.get('/captcha/sent', {
    params: {
      phone,
      ctcode
    }
  })
}
// 验证验证码
export const validate = (phone, captcha) => {
  return request.post('/captcha/verify', {
    phone,
    captcha
  })
}
// 登录状态
export const loginStatus = (cookie) => {
  return request({
    url: `/login/status?timestamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie,
    },
  })
}
// 二维码key生成接口
export const getKey = () => {
  return request.get('/login/qr/key', {
    params: {
      timestamp: Date.parse(new Date())
    }
  })
}
// 二维码生成接口
export const getqrimg = (key) => {
  return request.get('/login/qr/create', {
    params: {
      key,
      timestamp: Date.parse(new Date()),
      qrimg: true,
    }
  })
}
// 二维码检测扫码状态接口
export const getStatusCode = (key) => {
  return request.get('/login/qr/check', {
    params: {
      key,
      noCookie: true,
      timestamp: Date.parse(new Date())
    }
  })
}
// 获取账号信息
export const getUserInfo = () => {
  return request.get('/user/account')
}
// 手机登录
export const phoneLogin = (phone, password) => {
  return request.post('/login/cellphone', {
    phone,
    password
  })
}
// 退出登录
export const loginOut = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}
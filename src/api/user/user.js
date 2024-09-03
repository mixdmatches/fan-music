import request from "@/utils/request"
// 获取用户详情
export const getUserDetail = (uid) => {
  return request.get('/user/detail', {
    params: {
      uid
    }
  })
}
// 获取用户信息，歌单，收藏，mv,dj数量
export const getUserSubcount = () => {
  return request.get('/user/subcount')
}
// 获取用户歌单
export const getUserMonad = (uid) => {
  return request.get('/user/playlist', {
    params: {
      uid
    }
  })
}
// 获取用户喜欢的音乐列表
export const getUserLikeSong = (uid) => {
  return request.get('/likelist', {
    params: {
      uid
    }
  })
}
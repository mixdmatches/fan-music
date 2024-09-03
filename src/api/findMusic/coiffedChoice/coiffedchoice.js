import request from "@/utils/request";
// 获取歌单
export const getSongMonad = (limit) => {
  return request.get('/personalized', {
    params: {
      limit
    }
  })
}
// 获取新音乐
export const getNewSong = (limit) => {
  return request.get('/personalized/newsong', {
    params: {
      limit
    }
  })
}


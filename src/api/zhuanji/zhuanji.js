import request from "@/utils/request"
// 获取专辑详情
export const getZhuanjiDetail = (id) => {
  return request.get("/album", {
    params: {
      id
    }
  })
}
// 获取专辑评论
export const getZhuajiComment = (id, limit, offset) => {
  return request.get('/comment/album', {
    params: {
      id,
      limit,
      offset
    }
  })
}
import request from "@/utils/request"
// 获取音乐url
export const getSongUrl = (id, level = "exhigh") => {
  return request.get("/song/url/v1", {
    params: {
      id,
      level,
    }
  })
}

// 获取歌曲详情信息
export const getSongDetail = (ids) => {
  return request.get('/song/detail', {
    params: {
      ids
    }
  })
}

// 获取音乐评论
export const getMusicComment = (id) => {
  return request.get('/comment/music', {
    params: {
      id
    }
  })
}

// 音乐是否可用
export const isUse = (id) => {
  return request.get('/check/music', {
    params: {
      id
    }
  })
}
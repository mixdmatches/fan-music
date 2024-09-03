import request from "@/utils/request"

// 歌单分类
export const getMonadCategory = () => {
  return request.get('/playlist/catlist')
}

// 热门歌单分类
export const getHotMonadCategory = () => {
  return request.get('/playlist/hot')
}

// 歌单(网友精选碟)
export const getPersonChoice = (order, cat, limit, offset) => {
  return request.get('/top/playlist', {
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}

// 精品歌单标签列表
export const getMiracleMonad = () => {
  return request.get('/playlist/highquality/tags')
}


// 获取精品歌单
// cat: "华语" "流行" "古风"...默认为全部
// limit:默认50
export const getMonad = (cat, limit) => {
  return request.get('/top/playlist/highquality', {
    params: {
      cat,
      limit
    }
  })
}

// 获取热门歌单(歌单(网友精选))
export const getHotMonad = (limit) => {
  return request.get('/top/playlist', {
    params: {
      limit
    }
  })
}

// 相关歌单推荐
export const getRelatedMonad = (id) => {
  return request.get('/related/playlist', {
    params: {
      id
    }
  })
}

// 获取歌单详情
// 说明: 歌单能看到歌单名字, 但看不到具体歌单内容, 调用此接口, 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单, 登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song / detail 接口获取所有歌曲的详情
export const getMonadDetail = (id) => {
  return request.get('/playlist/detail', {
    params: {
      id,
    }
  })
}

// 获取歌单所有歌曲
export const getMonadMusics = (id, limit, offset) => {
  return request.get('/playlist/track/all', {
    params: {
      id,
      limit,
      offset
    }
  })
}

// 歌单详情动态
export const getMonadDynamic = (id) => {
  return request.get('/playlist/detail/dynamic', {
    params: {
      id
    }
  })
}

// 歌单评论
export const getMonadComment = (id, limit, offset, before) => {
  return request.get('/comment/playlist', {
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}
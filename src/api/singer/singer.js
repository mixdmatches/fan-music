import request from "@/utils/request"
// 获取歌手单曲
export const getSingerSong = (id) => {
  return request.get('/artists', {
    params: {
      id
    }
  })
}
// 获取歌手专辑
export const getSingerAlbum = (id, limit, offset) => {
  return request.get('/artists/album', {
    params: {
      id,
      limit,
      offset
    }
  })
}
// 获取歌手描述
export const getSingerDesc = (id) => {
  return request.get('/artist/desc', {
    params: {
      id
    }
  })
}
// 获取歌手详情
export const getSingerDetail = (id) => {
  return request.get('/artist/detail', {
    params: {
      id
    }
  })
}
// 获取相似歌手
export const getSingerSimi = (id) => {
  return request.get('/simi/artist', {
    params: {
      id
    }
  })
}
// 歌手热门50首歌
export const getSingerHotSong = (id) => {
  return request.get('/artist/top/song', {
    params: {
      id
    }
  })
}
// 歌手全部歌曲
export const getSingerAllSong = (id, order, limit, offset) => {
  return request.get('/artist/songs', {
    params: {
      id,
      order,
      limit,
      offset
    }
  })
}
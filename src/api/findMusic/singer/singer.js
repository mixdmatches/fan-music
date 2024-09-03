import request from "@/utils/request"
/**
 * 
 * @param {30} limit 
 * @param {-1:全部 1:男歌手 2:女歌手 3:乐队} type 
 * @param {-1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他} area 
 * @param {#:0 -1:热门 其他均abcd等} initial 
 * @returns 
 */
export const getSingerList = (limit, type, area, initial) => {
  return request.get('/artist/list', {
    params: {
      limit,
      type,
      area,
      initial
    }
  })
}
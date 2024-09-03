import request from '@/utils/request'
export const getSearchResult = (keywords, limit, offset, type,) => {
  return request.get('/cloudsearch', {
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}
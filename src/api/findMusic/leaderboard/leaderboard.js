import request from "@/utils/request"
export const getBoard = () => {
  return request.get('/toplist')
}
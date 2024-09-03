// 设置信息
export const setInfo = (key, value) => {
  if (typeof value == "object") {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 获取信息
export const getInfo = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 移除信息
export const removeInfo = (key) => {
  localStorage.removeItem(key)
}
// 获取用户 token
export const getUserToken = () => localStorage.getItem('user-token')

// 存储用户 token
export const setUserToken = token => {
  localStorage.setItem('user-token', token)
}

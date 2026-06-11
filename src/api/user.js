import request from '@/utils/request'

//注册接口
export const userRegisterService = (data) => {
  return request.post('/user/register', data)
}

//登录接口
export const userLoginService = (data) => {
  return request.post('/user/login', data)
}

//获取用户基本信息
export const userGetService = (userId) => {
  return request.get(`/user/${userId}`)
}

//更新用户信息
export const userUpdateService = (data) => request.put('/user/profile', data)

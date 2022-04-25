import axios from 'axios'
import { Message } from 'element-ui'
// axios 相关配置
// 携带Cookie
axios.defaults.withCredentials = true
// 请求头
axios.defaults.baseURL = 'http://localhost:8090'
// 请求拦截
axios.interceptors.request.use(config => {
  // 发送请求前做的事
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  // const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  // if (userInfo) {
  //  // 设置请求头中的token
  //   config.headers['token'] = userInfo.token
  // }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
  // 获取响应数据
  let res = response.data
  // 如果返回的是文件
  if (response.config.responseType === 'blob') {
    return res
  }
  // 兼容后端返回的字符串数据
  if (typeof res === 'string') {
    res = res ? JSON.parse(res) : res
  }
  if (res.code === 200) {
    // 响应数据中的code为200时 表示success 请求成功
    // 这里的code是后端返回给前端的
    return res
  } else {
    // 响应数据中的code不为200时 表示error 即后端给前端发送了错误
    Message.error(res.msg, { duration: 5000 })
    return Promise.reject(res.msg)
  }
}, error => {
  // Debug
  console.log('axios error: ' + error)
  if (error.response.data) {
    error.message = error.response.data.msg
    Message.error(error.message, { duration: 5000 })
    return Promise.reject(error)
  }
})

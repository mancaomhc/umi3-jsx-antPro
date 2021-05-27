import axios from 'axios'
import router from 'umi/router'
import { Modal } from 'antd'

import { getUserToken } from '@/utils/userToken'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

// 避免多次请求失效的弹窗
const requestFailes = new Set([])

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  if (requestFailes.has(response.status)) {
    return response
  }
  requestFailes.add(response.status)
  Modal.error({
    title: `请求错误 ${response.status}: ${response.url}`,
    content: errortext,
    okText: '确认',
    onOk: () => {
      requestFailes.delete(response.status)
      if (response.status === 401) {
        router.push('/user/login')
      }
    },
  })
  return response
  // const error = new Error(errortext)
  // error.name = response.status
  // error.response = response
  // throw error
}

// 实例化axios
const instance = axios.create({
  withCredentials: false,
  // timeout: 20000,
  baseURL: '/gateway/',
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = getUserToken()
    if (config.headers.Authorization == null) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error =>
    // Do something with request error
    Promise.reject(error),
)

// 响应拦截器
instance.interceptors.response.use(
  ({ config, data }) => {
    // 单独对登陆接口处理
    if (config.url.includes('oauth/token')) {
      return data
    }
    if (data.success || data.resultCode === '1') {
      return data
    }
    Modal.error({
      title: data.message || data.errDesc,
    })
    return data
  },
  error => {
    const res = error.response

    // 对一些特殊情况做处理
    if (res.data && res.data.success === false && res.data.message) {
      Modal.error({
        title: res.data.message,
      })
      return
    }
    if (res) {
      checkStatus(res)
    } else {
      Modal.error({
        title: '请求错误',
        content: error.toString(),
      })
    }
    Promise.reject(error)
  },
)

const request = (url, method, config) => instance({ url, method, ...config })

export const get = (url, params = {}, config = {}) => instance.get(url, { params, ...config })

export const post = (url, data = {}, config = {}) => instance.post(url, data, config)

export const put = (url, data = {}, config = {}) => instance.put(url, data, config)

export const dele = (url, params = {}, config = {}) => instance.delete(url, { params, ...config })

export default request

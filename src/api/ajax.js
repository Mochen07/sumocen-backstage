import axios from 'axios'
import { message } from 'antd'
import { BaseUrl } from './../config/base-url'
import { getObj } from './../tools/cache-tool'

const BASEURL = BaseUrl
axios.defaults.headers.common['Authorization'] = getObj('USERKEY').token

/*
 * 功能：
 * @ 发送网络请求
 * @ 统一处理网络错误
 * @ 接口信息：url, 参数, 请求方式
 * */
export const ajax = (url, data = {}, method = 'get', baseURL = BASEURL) => {
  return new Promise((resolve, reject) => {
    switch (method.toLowerCase()) {
      case 'get':
        axios
          .get(baseURL + url, {
            params: data,
          })
          .then((response) => {
            // 1. 网络请求成功
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              message.error(response.data.msg)
              reject()
            }
          })
          .catch((error) => {
            // 网络请求失败的时候
            message.error('网络异常: ' + error.message)
            reject()
          })
        break

      case 'post':
        axios
          .post(baseURL + url, data)
          .then((response) => {
            // 1. 网络请求成功
            if (response.data.code === 200) {
              resolve(response.data)
            } else {
              message.error(response.data.msg)
              reject()
            }
          })
          .catch((error) => {
            // 网络请求失败的时候
            message.error('网络异常: ' + error.message)
            reject()
          })
        break

      default:
        message.error('请输入正确的请求方式')
        break
    }
  })
}

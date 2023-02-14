import { message } from 'antd'
import axios from 'axios'
const KEY = 'e47fdcd61d254b90be7d3d0a333c0ff5'

// 和风天气开发服务 https://console.qweather.com/
export const getWeatherInfo = function (city = '成都') {
  let url = `https://devapi.qweather.com/v7/weather/now?location=101270101&key=${KEY}`
  return new Promise((resolve) => {
    axios
      .get(url)
      .then((res) => {
        res = res.data
        if (res.code === '200') {
          resolve({
            icon: res.now.icon,
            text: res.now.text,
            link: res.fxLink,
            updateTime: new Date(res.updateTime).getTime(),
          })
        } else {
          message.error('和风天气状态异常 ' + res.code)
          console.log('=======log=======', '和风天气状态异常', res)
        }
      })
      .catch((error) => {
        message.error('网络异常' + error.message)
      })
  })
}

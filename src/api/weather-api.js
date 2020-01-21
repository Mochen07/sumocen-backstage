import jsonp from 'jsonp'
import {message} from "antd"

const KEY = "KnHVOML3NCoHEjn8SsDESlKnGsexhhr7"

export const getWeatherInfo = (city='成都') => {
    let url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=${KEY}`

    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            if (err) {
                message.error("网络异常" + err.message)
            } else {
                // console.log(data, '天气信息')
                if (data.error === 0) {
                    let result = data.results[0].weather_data[0]
                    let picURL = result.nightPictureUrl
                    let notice = result.weather + result.temperature
                    resolve({picURL, notice})
                }
            }
        })
    })
}

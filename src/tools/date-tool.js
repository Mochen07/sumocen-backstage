/*
 * 格式化时间
 * */
export const formatTime = (val, type = 'format') => {
  // formatTime
  if (type === 'format') {
    let date = new Date(val)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? `0${month}` : month
    let day = date.getDate()
    day = day < 10 ? `0${day}` : day
    let hour = date.getHours()
    hour = hour < 10 ? `0${hour}` : hour
    let min = date.getMinutes()
    min = min < 10 ? `0${min}` : min
    let sec = date.getSeconds()
    sec = sec < 10 ? `0${sec}` : sec
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`
  }

  // timeAgo
  if (type === 'ago') {
    const pluralize = (time, label) => {
      const ago = `${time} ${label}`
      return ago + '前'
    }
    const between = Date.now() / 1000 - Number(new Date(val).getTime()) / 1000
    const hourS = 3600
    const dayS = hourS * 24
    const weekS = dayS * 7
    const monthS = dayS * 30
    const yearS = monthS * 12
    if (between < hourS) {
      return ~~(between / 60) === 0
        ? '刚刚'
        : pluralize(~~(between / 60), '分钟')
    }
    if (between < dayS) {
      return pluralize(~~(between / hourS), '小时')
    }
    if (between < weekS) {
      return pluralize(~~(between / dayS), '天')
    }
    if (between < monthS) {
      return pluralize(~~(between / weekS), '周')
    }
    if (between < yearS) {
      return pluralize(~~(between / monthS), '个月')
    }
    return pluralize(~~(between / yearS), '年')
  }
}

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Icon, Modal, Breadcrumb, Popconfirm } from 'antd'
import { getUser, removeUser } from 'api/user-api'
import { getWeatherInfo } from 'api/weather-api'
import { subscribeMenu } from 'api/menu-api'
import { formatTime } from 'tools/date-tool'
import 'pages/admin/components/right-header/right-header.less'

const { Header } = Layout

class RightHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: '',
      picURL: '',
      notice: '',
      breadMenus: [],
      hfWeather: {
        icon: 307,
        text: '未知',
      },
    }
  }

  // 退出登录
  _outLogin = () => {
    Modal.confirm({
      title: '退出',
      content: '确定退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        removeUser()
        this.props.history.replace('login')
      },
      onCancel: () => {
        // console.log("取消退出登录")
      },
    })
  }

  // 获取天气信息
  _getWeatherInfo() {
    let cacheInfo = JSON.parse(sessionStorage.getItem('hfWeather')||'{}')
    let updateTime = cacheInfo.updateTime
    let nowDateTime = new Date().getTime()
    console.log('=======log=======', '距离天气更新还有', ((1000*60*60 - (nowDateTime-updateTime)) / 1000 / 60).toFixed(0), '分');
    let isUpdate = updateTime && ((nowDateTime-updateTime) >= 1000*60*60)
    if (!updateTime || isUpdate) {
      getWeatherInfo().then((result) => {
        console.log(result, "天气信息")
        sessionStorage.setItem('hfWeather', JSON.stringify(result))
        this.setState({
          hfWeather: result,
        })
      })
    } else {
      this.setState({
        hfWeather: cacheInfo,
      })
    }
  }

  componentDidMount() {
    // 获取天气信息
    this._getWeatherInfo()

    // 获取当前时间
    this.timer = setInterval(() => {
      this.setState({
        currentTime: formatTime(Date.now()),
      })
    }, 1000)

    // 订阅获取面包屑信息
    subscribeMenu((msg, data) => {
      console.log(msg, data, this.state.breadMenus, '接收到的面包屑信息')
      // 初略解决面包屑新增编辑的时候异常问题
      if ((!data || !data.length)) {
        data = this.state.breadMenus
        if (this.state.breadMenus.length===1) {
          data.push({icon: 'radius-upright', title: '操作'})
        }
      }
      this.setState({
        breadMenus: data,
      })
    })
  }

  // 组件销毁的时候，删除定时器
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { collapsed, toggle } = this.props
    const { currentTime, hfWeather, breadMenus } = this.state
    // 获取登陆的用户信息
    let userInfo = getUser()
    // console.log(userInfo, "获取到的用户信息")

    return (
      <Header className="adminHeader">
        {/*展开按钮*/}
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
        {/*显示用户名和退出按钮*/}
        <div className="admin-header-top">
          <Popconfirm
            title="确认退出登录吗?"
            placement="bottom"
            onConfirm={this._outLogin}
            okText="是"
            cancelText="否"
          >
            <span>欢迎您：{userInfo.nickname}</span>
          </Popconfirm>
        </div>
        {/*面包屑和天气*/}
        <div className="admin-header-bottom">
          <div className="left">
            <Breadcrumb>
              {breadMenus.map((item) => {
                return (
                  <Breadcrumb.Item key={item.title}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Breadcrumb.Item>
                )
              })}
            </Breadcrumb>
          </div>
          <div className="right">
            <span>{currentTime}</span>
            <i className={"qi-"+hfWeather.icon}></i>
            <span>{hfWeather.text}</span>
          </div>
        </div>
      </Header>
    )
  }
}

export default withRouter(RightHeader)

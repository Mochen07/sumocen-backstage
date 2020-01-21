import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Layout, Icon, Button, Modal, Breadcrumb } from 'antd';
import {getUser, removeUser} from '../../../../api/user-api'
import {getWeatherInfo} from '../../../../api/weather-api'
import {subscribeMenu} from '../../../../api/menu-api'
import {timeFormat} from '../../../../tools/date-tool'
import './right-header.less'

const { Header } = Layout;

class RightHeader extends Component {

    constructor (props) {
        super(props)
        this.state = {
            currentTime: '',
            picURL: "",
            notice: "",
            breadMenus: []
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
        });
    }

    componentDidMount() {
        // 获取天气信息
        getWeatherInfo().then(result => {
            // console.log(result, "天气信息")
            this.setState({
                picURL: result.picURL,
                notice: result.notice
            })
        })

        // 获取当前时间
        this.timer = setInterval(() => {
            this.setState({
                currentTime: timeFormat(Date.now())
            })
        },1000)

        // 订阅获取面包屑信息
        subscribeMenu ((msg, data) => {
            // console.log(msg, data, '接收到的面包屑信息')
            this.setState({
                breadMenus: data
            })
        })
    }


    // 组件销毁的时候，删除定时器
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {

        const {collapsed, toggle} = this.props
        const {currentTime, picURL, notice, breadMenus} = this.state
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
                    <span>欢迎您：{userInfo.userName}</span>
                    <Button type="danger" className="button" onClick={this._outLogin}>退出</Button>
                </div>
                {/*面包屑和天气*/}
                <div className="admin-header-bottom">
                    <div className="left">
                        <Breadcrumb>
                            {
                                breadMenus.map((item) => {
                                    return (
                                        <Breadcrumb.Item key={item.title}>
                                            <Icon type={item.icon} />
                                            <span>{item.title}</span>
                                        </Breadcrumb.Item>
                                    )
                                })
                            }
                        </Breadcrumb>
                    </div>
                    <div className="right">
                        <span>{currentTime}</span>
                        <img src={picURL} alt=""/>
                        <span>{notice}</span>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader)

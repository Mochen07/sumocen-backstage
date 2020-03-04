import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon, Layout} from 'antd';
import {publishMenu} from "api/menu-api"
import 'pages/admin/components/left-nav/left-nav.less'
// redux
import {getMenusData} from 'store/actionCreators'
import {connect} from "react-redux"

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftNav extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    // 加载左侧菜单
    _renderMenu = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item._key}>
                        <Link to={item._key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item._key}
                        title={
                            <span>
                              <Icon type={item.icon} />
                              <span>{item.title}</span>
                            </span>
                        }
                    >
                        {/*如果有子菜单使用 ‘递归’ 层层渲染*/}
                        {this._renderMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    // 获取当前页面应该展开的菜单
    _getOpenKeys = (menuList, path) => {
        for (let i = 0; i < menuList.length; i++) {
            let item = menuList[i]
            if (item.children && item.children.find(c_item => {
                return c_item._key === path
            })) {
                return item._key
            }
        }
        return ""
    }

    // 定义一个方法
    // 功能: 根据一个指定的key<获取到对应的icon, title
    _getMenuItem = (key, menuList=this.props.menusData) => {
        for (let i = 0; i < menuList.length; i++) {
            let item = menuList[i]
            if (item._key === key) {
                return {
                    title: item.title,
                    icon: item.icon
                }
            }

            if (item.children) {
                let result = this._getMenuItem(key, item.children)
                if (result) {
                    return result
                }
            }
        }
    }

    componentDidMount () {
        // 派发异步任务
        this.props.getMenusDataList()
    }

    render() {

        const {collapsed, location, menusData} = this.props

        // 1、获取当前的路由和路径
        let path = location.pathname
        let openKeys = this._getOpenKeys(menusData, path)
        // console.log(path, openKeys, '当前路由以及因该打开的菜单项')

        // 2、根据路径获取面包屑需要显示的信息
        let pub_menus = []
        let currentKey = this._getMenuItem(path)
        if (currentKey) {
            pub_menus.push(currentKey)
        }
        let openMenu = this._getMenuItem(openKeys)
        if (openMenu) {
            pub_menus.unshift(openMenu)
        }
        console.log(pub_menus, "面包屑信息")
        publishMenu(pub_menus)

        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <Icon type="thunderbolt" theme="twoTone" className="icon" />
                    <span className={`name ${collapsed ? 'close' : ''}`}>Sumocen后台管理系统</span>
                </div>
                {/*
                    defaultSelectedKeys 菜单的默认选中
                    defaultOpenKeys     菜单的默认展开
                    bug: anth ui状态值默认只渲染一次，所以在menuList没有值的时候不渲染
                */}
                {
                    this.props.menusData.length ? (
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKeys]}>
                            {this._renderMenu(this.props.menusData)}
                        </Menu>
                    ) : ""
                }
            </Sider>
        )
    }
}

// 通过redux, 将参数映射到组件的props身上
let  mapStateToProps = (state) => {
    // console.log("映射状态到组件属性上");
    return {
        menusData: state.menusData
    }
}

let mapDispatchToProps = (dispatch) => {
    // console.log("映射分发操作到组件属性上");
    return {
        getMenusDataList: () => dispatch(getMenusData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftNav))

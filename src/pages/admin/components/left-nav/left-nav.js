import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon, Layout} from 'antd';
import {getMenuList, publishMenu} from "../../../../api/menu-api"
import './left-nav.less'

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuList: []
        }
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
    _getMenuItem = (key, menuList=this.state.menuList) => {
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
        // 获取菜单列表
        getMenuList().then(result => {
            console.log(result, "菜单数据")
            // if (result.status === 0) {
            //     this.setState({
            //         menuList: result.data
            //     })
            // }
            const menuList = {
                "status":0,
                "data":[
                    {"id":1,"title":"首页","_key":"/home","icon":"home","parentID":0},
                    {"id":2,"title":"个人信息","_key":"/user","icon":"user","parentID":0},
                    {"id":3,"title":"菜单管理","_key":"/category","icon":"appstore","parentID":0},
                    {"id":4,"title":"题目管理","_key":"/questions","icon":"container","parentID":0,
                        "children":[
                            {"id":5,"title":"Java","_key":"/question/java","icon":"android","parentID":4},
                            {"id":6,"title":"Python","_key":"/question/python","icon":"bug","parentID":4},
                            {"id":7,"title":"H5","_key":"/question/h5","icon":"html5","parentID":4}
                        ]
                    },
                    {"id":8,"title":"统计","_key":"/charts","icon":"area-chart","parentID":0,
                        "children":[
                            {"id":9,"title":"柱形图","_key":"/charts/bar","icon":"bar-chart","parentID":8},
                            {"id":10,"title":"折线图","_key":"/charts/line","icon":"line-chart","parentID":8},
                            {"id":11,"title":"饼图","_key":"/charts/pie","icon":"pie-chart","parentID":8}
                        ]
                    }
                ]
            }
            this.setState({
                menuList: menuList.data
            })
        })
    }

    render() {

        const {collapsed, location} = this.props
        const {menuList} = this.state

        // 1、获取当前的路由和路径
        let path = location.pathname
        let openKeys = this._getOpenKeys(menuList, path)
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
        // console.log(pub_menus, "面包屑信息")
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
                    menuList.length ? (
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKeys]}>
                            {this._renderMenu(menuList)}
                        </Menu>
                    ) : ""
                }
            </Sider>
        )
    }
}

export default withRouter(LeftNav)

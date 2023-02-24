import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { isLogin } from 'api/user-api'
import 'pages/admin/admin.less'

import LeftNav from 'pages/admin/components/left-nav/left-nav'
import RightHeader from 'pages/admin/components/right-header/right-header'
import NotFound from 'pages/not-found/not-found'
import Home from 'pages/home/home'
import User from 'pages/user/user'
import Menus from 'pages/menus/menus'
import Images from 'pages/image-swiper/images'
import Document from 'pages/document/document'
import Article from 'pages/article/index'
import Tag from 'pages/tag/index'

const { Content, Footer } = Layout

export default class Admin extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    // 判断是否登陆
    if (!isLogin()) {
      return <Redirect to="/login" />
    }

    const { collapsed } = this.state

    return (
      // 页面布局
      <Layout className="adminPane">
        {/*左侧菜单*/}
        <LeftNav collapsed={collapsed} />
        {/*右侧布局*/}
        <Layout>
          {/*右侧头部*/}
          <RightHeader collapsed={collapsed} toggle={this.toggle} />
          {/*右侧内容*/}
          <Content className="adminContent">
            <Switch>
              <Redirect from="/" exact to="/article" />
              <Route path="/article" component={Article} />
              <Route path="/tag" component={Tag} />
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/menus" component={Menus} />
              <Route path="/image" component={Images} />
              <Route path="/document" component={Document} />
              {/*<Route path="/charts" component={Charts} />*/}
              <Route component={NotFound} />
            </Switch>
          </Content>
          {/*右侧尾部*/}
          <Footer className="adminFooter">
            Ant Design ©2018 Created by Ant UED by MoChen
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

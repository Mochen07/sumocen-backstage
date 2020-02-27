import React, {Component} from "react"
import {Redirect, Switch, Route} from "react-router-dom"
import { Layout } from 'antd';
import {isLogin} from './../../api/user-api'
import './admin.less'

import LeftNav from './components/left-nav/left-nav'
import RightHeader from './components/right-header/right-header'
import Home from '../home/home'
import User from '../user/user'
import NotFound from '../not-found/not-found'

const { Content, Footer } = Layout;

export default class Admin extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {

        // 判断是否登陆
        if (!isLogin()) {
            return <Redirect to="/login" />
        }

        const {collapsed} = this.state

        return (
            // 页面布局
            <Layout className="adminPane">
                {/*左侧菜单*/}
                <LeftNav collapsed={collapsed}/>
                {/*右侧布局*/}
                <Layout>
                    {/*右侧头部*/}
                    <RightHeader collapsed={collapsed} toggle={this.toggle}/>
                    {/*右侧内容*/}
                    <Content className="adminContent">
                        <Switch>
                            <Redirect from="/" exact to="/home" />
                            <Route path="/home" component={Home} />
                            <Route path="/user" component={User} />
                            {/*<Route path="/category" component={Category} />*/}
                            {/*<Route path="/question" component={Question} />*/}
                            {/*<Route path="/charts" component={Charts} />*/}
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                    {/*右侧尾部*/}
                    <Footer className="adminFooter">Ant Design ©2018 Created by Ant UED by MoChen</Footer>
                </Layout>
            </Layout>
        )
    }
}

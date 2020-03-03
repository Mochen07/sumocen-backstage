import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd';  // 用户登陆面板
import {checkLogin, saveUser, isLogin} from 'api/user-api'
import 'pages/login/login.less'

class Login extends Component {

    // 表单Submit事件
    _handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('按规则输入的表单数据', values);
                const {username, password} = values
                // 1、发送网络请求
                checkLogin(username, password).then(result=>{
                    console.log('登陆返回的数据', result)
                    if (result.status===200) {
                        // 2、数据持久化
                        saveUser(result.data)
                        // 3、登陆成功要做的事情
                        message.success("登陆成功")
                        this.props.history.replace('/')
                    } else {
                        message.error(result.message)
                    }
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        // 判断是否登陆
        if (isLogin()) {
            return <Redirect to="/" />
        }

        return (
            <div className="loginBack">

                {/*登陆面板*/}
                <div className="loginPane">
                    <div className="paneHead">
                        <Icon type="thunderbolt" theme="twoTone" className="icon" />
                        <span className="name">Sumocen后台管理系统</span>
                    </div>

                    {/*提交表单面板*/}
                    <div className="paneForm">
                        <Form onSubmit={this._handleSubmit} className="login-form">
                            <Form.Item>

                                {/*this.props.form.getFieldDecorator(id, options)(<Input/>)是一个高阶组件*/}
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {

                                    // 可以同时定义多个规则
                                    rules: [
                                        { required: true, message: '请输入密码' },
                                        { min: 3, message: '密码最少3位' },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="loginBtn">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

/*表单的高阶组件，目的是为了传this.props.form*/
export default Form.create({})(Login)

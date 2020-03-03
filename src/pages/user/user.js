import React, {Component} from 'react'
import {Form, Input, Button, message} from 'antd'
import {getUser, updateUser, saveUser} from 'api/user-api'
import UploadHeader from "pages/user/upload-header"

class User extends Component{

    constructor(props) {
        super(props)
        this.uploadImg = React.createRef()
    }

    // Input 布局
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    };
    // Button 布局
    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    _handlerSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                let avatar = this.uploadImg.current._getHeaderImageName()
                updateUser(Object.assign(values, {avatar})).then(result => {
                    console.log(result, "更新信息返回结果")
                    if (result.status === 200) {
                        saveUser(result.data)
                        message.success(result.message)
                    } else {
                        message.error('更新信息失败')
                    }
                })
            }
        })
    }

    render() {
        let user = getUser()

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form {...this.formItemLayout} onSubmit={this._handlerSubmit}>
                    <Form.Item>
                        {getFieldDecorator('id', {
                            initialValue: user.id
                        })(
                            <Input type="hidden" />
                        )}
                    </Form.Item>
                    <Form.Item label="账号">
                        {getFieldDecorator('username', {
                            initialValue: user.username
                        })(
                            <Input type="text" disabled={true} />
                        )}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            initialValue: user.password,
                            rules: [
                                {required: true, message: '必须输入密码'},
                                {min: 2, message: '密码必须大于2位'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入密码" />
                        )}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {getFieldDecorator('nickname', {
                            initialValue: user.nickname,
                            rules: [
                                {required: true, message: '必须输入密码'},
                                {min: 2, message: '密码必须大于2位'}
                            ]
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )}
                    </Form.Item>
                    <Form.Item label="头像">
                        <UploadHeader ref={this.uploadImg} headerImg={user.avatar} />
                    </Form.Item>
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(User)

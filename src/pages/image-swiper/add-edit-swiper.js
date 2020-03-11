import React, {Component} from "react"
import {Card, Form, Input, Button, Divider, Select, message} from 'antd'

class AddEditSwiper extends Component {
    state = {
        allCourse: [],
        currentCourse: {},
        editQuestion: {}
    }

    // 表格布局
    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 7 },
        },
    }

    // 按钮布局
    tailFormItemLayout = {
        wrapperCol: {
            sm: {
                span: 6,
                offset: 3,
            },
        },
    }

    render() {
        const {getFieldDecorator} = this.props.form

        return (
            <Card title={666666}>
                <Form {...this.formItemLayout} onSubmit={this._onSubmit}>
                    <Form.Item label={'名称'}>
                        {getFieldDecorator('categoryID',{
                            rules: [
                                {required: true, message: '必填项'}
                            ],
                            initialValue: this.state.currentCourse.id
                        })(
                            <Select>
                                {this.state.allCourse.map((item) => {
                                    return (
                                        <Select.Option value={item.id} key={item.id}>{item.title}</Select.Option>
                                    )
                                })}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label={'图片'}>
                        {getFieldDecorator('title',{
                            rules: [
                                {required: true, message: '必填项'}
                            ],
                            initialValue: this.state.editQuestion.title
                        })(
                            <Input type="text" placeholder={'请输入题目标题'} />
                        )}
                    </Form.Item>
                    <Form.Item label={'链接地址'}>
                        {getFieldDecorator('title',{
                            rules: [
                                {required: true, message: '必填项'}
                            ],
                            initialValue: this.state.editQuestion.title
                        })(
                            <Input type="text" placeholder={'请输入题目标题'} />
                        )}
                    </Form.Item>
                    <Form.Item label={'介绍'}>
                        {getFieldDecorator('content',{
                            rules: [
                                {required: true, message: '必填项'}
                            ],
                            initialValue: this.state.editQuestion.content
                        })(
                            <Input.TextArea placeholder={'请输入题目内容'} />
                        )}
                    </Form.Item>
                    <Form.Item {...this.tailFormItemLayout}>
                        <Button type={'primary'} htmlType={"submit"}>确定</Button>
                        <Divider type="vertical" />
                        <Button onClick={this.props.history.goBack}>取消</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(AddEditSwiper)

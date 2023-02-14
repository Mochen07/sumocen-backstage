import React, { Component } from 'react'
import { Card, Form, Input, Button, Divider, message } from 'antd'
import UploadHeader from 'pages/user/upload-header'

import { addSwiper, editSwiper } from 'api/image-swiper'

class AddEditSwiper extends Component {
  constructor(props) {
    super(props)
    this.uploadImg = React.createRef()
  }

  state = {
    allCourse: [],
    currentSwiper: {},
    editSwiper: this.props.location.state.swiperData || {},
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

  // 提交修改
  _onSubmit = (e) => {
    e.preventDefault()
    console.log('提交了表单')
    this.props.form.validateFields((error, values) => {
      if (!error) {
        let url = this.uploadImg.current._getHeaderImageName()
        values.url = url
        console.log(values, '没有问题的表单数据')
        const id = this.state.editSwiper._id

        if (id) {
          editSwiper(Object.assign(values, { id: id })).then((result) => {
            if (result.status === 200) {
              message.success('编辑成功')
              this.props.history.goBack()
            } else {
              message.error('编辑失败')
            }
          })
        } else {
          addSwiper(values).then((result) => {
            if (result.status === 200) {
              message.success('添加成功')
              this.props.history.goBack()
            } else {
              message.error('添加失败')
            }
          })
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { editSwiper } = this.state

    return (
      <Card title={editSwiper._id ? '编辑' : '添加'}>
        <Form {...this.formItemLayout} onSubmit={this._onSubmit}>
          <Form.Item label={'名称'}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: editSwiper.name,
            })(<Input type="text" placeholder={'请输入swiper名称'} />)}
          </Form.Item>
          <Form.Item label="图片">
            <UploadHeader ref={this.uploadImg} headerImg={editSwiper.url} />
          </Form.Item>
          <Form.Item label={'跳转链接'}>
            {getFieldDecorator('link', {
              rules: [{ required: false, message: '必填项' }],
              initialValue: editSwiper.link,
            })(<Input type="text" placeholder={'请输入swiper跳转链接'} />)}
          </Form.Item>
          <Form.Item label={'描述'}>
            {getFieldDecorator('info', {
              rules: [{ required: true, message: '必填项' }],
              initialValue: editSwiper.info,
            })(<Input.TextArea placeholder={'请输入swiper描述'} />)}
          </Form.Item>
          <Form.Item {...this.tailFormItemLayout}>
            <Button type={'primary'} htmlType={'submit'}>
              确定
            </Button>
            <Divider type="vertical" />
            <Button onClick={this.props.history.goBack}>取消</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(AddEditSwiper)

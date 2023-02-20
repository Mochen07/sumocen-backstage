import React, { Component } from 'react'
import { Card, Button, Modal, message, Drawer, Form, Input } from 'antd'
import Markdown from 'pages/document/components/markdown'
import UploadImg from 'pages/article/upload-img'

import { reqArticleAddEdit } from 'api/article'

import './add-edit.less'

class AddEdit extends Component {

  constructor() {
    super()
    this.uploadImg = React.createRef()
    this.markdown = React.createRef()
  }

  state = {
    formData: {
      title: '',        // 标题
      description: '',  // 描述
      content: '',      // 富文本内容
      poster: '',       // 海报
      tag: [],          // 标签
      keywords: '',     // 关键词
      _id: '',          // ID
    },
    isFullScreen: false,
    visible: false,
  }

  // Input 布局
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  }
  // Button 布局
  tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 4,
      },
    },
  }

  _Back = () => {
    Modal.confirm({
      title: '确定返回吗？',
      content: '未保存的内容将会丢失',
      okText: '好的',
      cancelText: '取消',
      onOk: () => {
        this.props.history.goBack()
      },
      onCancel: () => {},
    })
  }

  fullScreen = () => {
    console.log('fullscreen:', this.state.isFullScreen)
    if (!this.state.isFullScreen) {
      this.requestFullScreen()
    } else {
      this.exitFullscreen()
    }
    this.setState({
      isFullScreen: !this.state.isFullScreen,
    })
  }

  //进入全屏
  requestFullScreen = () => {
    var de = document.documentElement
    if (de.requestFullscreen) {
      de.requestFullscreen()
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen()
    } else if (de.webkitRequestFullScreen) {
      de.webkitRequestFullScreen()
    }
  }

  //退出全屏
  exitFullscreen = () => {
    console.log('exitFullscreen')
    var de = document
    if (de.exitFullscreen) {
      de.exitFullscreen()
    } else if (de.mozCancelFullScreen) {
      de.mozCancelFullScreen()
    } else if (de.webkitCancelFullScreen) {
      de.webkitCancelFullScreen()
    }
  }

  // 保存当前表单提交
  confirmSave = () => {
    this.props.form.validateFields((error, values) => {
      if (!error) {
        let poster = this.uploadImg.current._getHeaderImageName()
        let content = this.markdown.current.state.document
        if (!poster) {return message.error('请上传文章海报')}
        if (!content) {return message.error('请编辑文章内容')}
        values.poster = poster
        values.content = content
        if (!values._id) {delete values._id}
        reqArticleAddEdit(values).then((res) => {
          if (res.code===200) {
            message.success('保存成功')
            this.props.history.goBack()
          }
        })
      } else {
        message.error('保存失败')
        this.drawerSwitch()
      }
    })
  }

  // 相关信息
  relevantInformation = () => {
    message.success('相关信息')
    this.drawerSwitch()
  }

  // 抽屉的显示与隐藏
  drawerSwitch = () => {
    this.setState({
      visible: !this.state.visible,
    })
  }

  // 监听fullscreenchange事件
  watchFullScreen = () => {
    const _self = this
    document.addEventListener(
      'fullscreenchange',
      function () {
        _self.setState({
          isFullScreen: document.webkitIsFullScreen,
        })
      },
      false
    )
  }

  // 移除监听
  removeFullScreen = () => {
    document.removeEventListener('fullscreenchange', function () {}, false)
  }

  componentDidMount = () => {
    this.watchFullScreen()
  }

  componentWillUnmount = () => {
    this.removeFullScreen()
  }

  render() {
    const { isFullScreen, formData } = this.state
    const { getFieldDecorator } = this.props.form

    const leftBtn = (
      <div>
        <Button
          className="mr20"
          shape="circle"
          icon="left"
          onClick={this._Back}
        />
        <Button
          className="mr20"
          shape="circle"
          icon="save"
          onClick={this.confirmSave}
        />
        <Button className="mr20" type="primary" onClick={this.drawerSwitch}>
          相关信息
        </Button>
        <Button type="dashed" onClick={this.fullScreen}>
          全屏
        </Button>
      </div>
    )

    return (
      <Card
        className={(isFullScreen ? 'fullScreen' : '') + ' cardContainer'}
        title="MarkDown编辑"
        extra={leftBtn}
      >
        <Markdown ref={this.markdown} />
        {/* 相关信息 */}
        <Drawer
          title="相关信息"
          placement="right"
          closable={false}
          width="400"
          onClose={this.drawerSwitch}
          visible={this.state.visible}
        >
          <Form {...this.formItemLayout}>
            <Form.Item>
              {getFieldDecorator('_id', {
                initialValue: formData._id,
              })(<Input type="hidden" />)}
            </Form.Item>
            <Form.Item label="标题">
              {getFieldDecorator('title', {
                initialValue: formData.title,
                rules: [
                  { required: true, message: '请输入文章标题' },
                  { min: 1, max: 60, message: '标题字数1~60之间' },
                ],
              })(<Input type="text" maxLength={60} placeholder="请输入文章标题" />)}
            </Form.Item>
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                initialValue: formData.description,
              })(<Input.TextArea type="text" placeholder="请输入文章描述" />)}
            </Form.Item>
            <Form.Item label="海报">
              <UploadImg ref={this.uploadImg} headerImg={formData.poster} />
            </Form.Item>
          </Form>
        </Drawer>
      </Card>
    )
  }
}

export default Form.create()(AddEdit)

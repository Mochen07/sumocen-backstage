import React, { Component } from 'react'
import { Form } from '@ant-design/compatible';
import IconFont from 'tools/icon-font'
// import '@ant-design/compatible/assets/index.css';


import { PlusOutlined } from '@ant-design/icons';
import { Tag, Input, Tooltip, Modal, Switch, message } from 'antd';
import './index.less'

import { reqTagList, reqTagAddEdit, reqTagDelete } from 'api/tag'
export default class TagView extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    visible: false,
    nowTagInfo: {},
  }

  handleClose = (nowTag) => {
    const tags = this.state.tags.filter((tag) => tag._id !== nowTag._id)
    this.setState({ tags })
    const params = {_id: nowTag._id}
    reqTagDelete(params).then(res => {
      message.success(res.msg)
    }).catch(err => {
      reqTagList()
    })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleTagName = (e) => {
    const nowTagInfo = Object.assign(this.state.nowTagInfo, {name: e.target.value})
    this.setState({ nowTagInfo: nowTagInfo })
  }

  handleTagIcon = (e) => {
    const nowTagInfo = Object.assign(this.state.nowTagInfo, {icon: e.target.value})
    this.setState({ nowTagInfo: nowTagInfo })
  }

  handleTagRecycle = (e) => {
    const nowTagInfo = Object.assign(this.state.nowTagInfo, {recycle: e})
    this.setState({ nowTagInfo: nowTagInfo })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    if (!inputValue) {
      this.setState({
        inputVisible: false,
      })
      return
    }
    let { tags, nowTagInfo } = this.state
    const params = {
      ...nowTagInfo,
      name: inputValue,
    }
    reqTagAddEdit(params).then(() => {
      if (inputValue && tags.findIndex((tag) => tag.name === inputValue) === -1) {
        tags = [...tags, {name: inputValue}]
      }
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      })
    })
  }

  saveInputRef = (input) => (this.input = input)

  reqTagList = () => {
    reqTagList().then((res) => {
      const tags = res.data
      this.setState({
        tags,
      })
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleModalOk = () => {
    reqTagAddEdit({...this.state.nowTagInfo}).then(res => {
      message.success(res.msg)
      this.setState({
        visible: false,
        nowTagInfo: {},
      })
      if (this.state.nowTagInfo.recycle) {
        this.reqTagList()
      }
    })
  }

  handleModalCancel = () => {
    this.setState({
      visible: false,
      nowTagInfo: {},
    })
  }

  handleTagClick = (tag) => {
    this.setState({
      visible: true,
      nowTagInfo: JSON.parse(JSON.stringify(tag)),
    })
  }

  componentDidMount() {
    this.reqTagList()
  }

  render() {
    const { tags, inputVisible, inputValue, nowTagInfo } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 },
      },
    }
    return (
      (<div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag._id || new Date().getTime()}
              closable={!tag.useNum}
              onClose={() => this.handleClose(tag)}
              onClick={() => this.handleTagClick(tag)}
            >
              <IconFont type={tag.icon || 'slack-square-fill'} className="icon-font" />
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
              {!!tag.useNum ? (
                <span className="useNum">{tag.useNum}</span>
              ) : (
                ''
              )}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag.name} key={tag._id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <PlusOutlined /> New Tag
          </Tag>
        )}
        <Modal
          title={nowTagInfo.name}
          open={this.state.visible}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        >
          <Form {...formItemLayout}>
            <Form.Item label="名称">
              <Input disabled={nowTagInfo.useNum>0} value={nowTagInfo.name} onChange={this.handleTagName}/>
            </Form.Item>
            <Form.Item label="图标">
              <Input value={nowTagInfo.icon} onChange={this.handleTagIcon}/>
            </Form.Item>
            <Form.Item label="隐藏" valuepropname={nowTagInfo.recycle?1:0} key={nowTagInfo.recycle}>
              <Switch defaultChecked={nowTagInfo.recycle} onChange={this.handleTagRecycle} />
            </Form.Item>
          </Form>
        </Modal>
      </div>)
    );
  }
}
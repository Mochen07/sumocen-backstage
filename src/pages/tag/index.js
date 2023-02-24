import React, { Component } from 'react'
import { Tag, Input, Tooltip, Icon, Modal } from 'antd'

import { reqTagList, reqTagAddEdit, reqTagDelete } from 'api/tag'

export default class Document extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    visible: false,
    nowTagInfo: {}
  }
  handleClose = (nowTag) => {
    const tags = this.state.tags.filter((tag) => tag._id !== nowTag._id)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags } = this.state
    if (inputValue && tags.findIndex((tag) => tag.name === inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
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

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  handleTagClick = (tag) => {
    this.setState({
      visible: true,
      nowTagInfo: tag,
    })
  }

  componentDidMount() {
    this.reqTagList()
  }

  render() {
    const { tags, inputVisible, inputValue } = this.state
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag
              key={tag._id}
              closable={tag.useNum === 0}
              onClose={() => this.handleClose(tag)}
              onClick={() => this.handleTagClick(tag)}
            >
              <Icon type={tag.icon} />
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}+
              {tag.useNum}
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
            <Icon type="plus" /> New Tag
          </Tag>
        )}
        <Modal
          title={this.state.nowTagInfo.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input value={this.state.nowTagInfo.name}/>
          <Input value={this.state.nowTagInfo.icon}/>
        </Modal>
      </div>
    )
  }
}

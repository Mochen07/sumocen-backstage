import React, { Component } from 'react'
import { Card, Button } from 'antd'
import Markdown from 'pages/document/components/markdown'

import './add-edit.less'

export default class AddEdit extends Component {
  state = {
    input: '',
    isFullScreen: false,
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
    const { isFullScreen } = this.state

    const leftBtn = (
      <Button type="dashed" onClick={this.fullScreen}>
        全屏
      </Button>
    )

    return (
      <Card
        className={(isFullScreen ? 'fullScreen' : '') + ' cardContainer'}
        title="MarkDown编辑"
        extra={leftBtn}
      >
        <Markdown />
      </Card>
    )
  }
}

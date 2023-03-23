import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';
import { BaseUrlUpload } from 'config/base-url'
import { getUser } from 'api/user-api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default class UploadHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }

    if (this.props.headerImg) {
      this.state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
          {
            uid: '-1',
            name: this.props.headerImg,
            status: 'done',
            url: this.props.headerImg,
          },
        ],
      }
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    })
  }

  // 上传组件发生的事件
  handleChange = ({ file, fileList }) => {
    // console.log(file, '当前图片')
    // console.log(fileList, '当前图片列表')

    // 当上传完毕的时候
    if (file.status === 'done') {
      if (file.response.code === 200) {
        let { url } = file.response.data
        fileList[0].url = url
        message.success('上传成功')
      } else {
        message.error('上传失败')
      }
    }
    this.setState({ fileList })
  }

  // 获取图片的路径
  _getHeaderImageName = () => {
    if (this.state.fileList.length) {
      return this.state.fileList[0].url
    }
    return ''
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          accept="image/*"
          headers={{ Authorization: getUser().token }}
          method="POST"
          action={BaseUrlUpload + '/api/upload'}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
import React, {Component} from 'react'
import { Upload, Icon, Modal, message } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class UploadHeader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [
                // {
                //     uid: '-1',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // }
            ],
        };

        if (this.props.headerImg) {
            this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: [
                    {
                        uid: '-1',
                        name: this.props.headerImg,
                        status: 'done',
                        url: "http://localhost:5000/userImg/" + this.props.headerImg,
                    }
                ],
            };
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 上传组件发生的事件
    handleChange = ({ file, fileList }) => {
        console.log(file, '当前图片')
        console.log(fileList, '当前图片列表')

        // 当上传完毕的时候
        if (file.status === "done") {
            if (!file.response.status) {
                let {name, url} = file.response.data
                fileList[0].name = name
                fileList[0].url = url
                message.success('上传成功')
            } else {
                message.error('上传失败')
            }
        }
        this.setState({ fileList })
    };

    // 获取当前头像的名称
    _getHeaderImageName = () => {
        if (this.state.fileList.length) {
            return this.state.fileList[0].name
        }
        return ""
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    accept="image/*"
                    action="api/uploadImg"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

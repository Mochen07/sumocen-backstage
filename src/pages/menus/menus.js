import React, {Component} from "react"
import { Input, Button, Modal, Row, Col, Card } from 'antd';
import {updateMenusData} from 'store/actionCreators'
import {connect} from 'react-redux'

import { getMenuListUpdate } from 'api/menu-api';
import defaultMenus from "config/default-menus";

const { TextArea } = Input;

class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // 默认菜单数据
            backupData: defaultMenus,
        }

        this.TextAreaDom = React.createRef()
    }

    // 正则格式化数据，以供编辑
    _DataFormat = (data) => {
        let formatString = JSON.stringify(data)
        formatString = formatString.replace(/(},)|(\[)|(\])/g, "$1$2$3\n")
        return formatString
    }

    // 提交菜单修改
    _EditData = () => {
        Modal.confirm({
            title: '提示',
            content: '确认使用当前菜单配置信息？',
            maskClosable: true,
            onOk:() => {
                const currentEdit = JSON.parse(this.TextAreaDom.current.state.value.replace(/\n/g, ""))
                const params = {
                    username: 'admin',
                    menus: currentEdit
                }
                getMenuListUpdate(params).then(result => {
                    this.props.updateMenusData(result.data)
                })
            },
            onCancel() {console.log('Cancel');},
        });
    }

    render() {
        const {backupData} = this.state
        return (
            <div>
                <Row>
                    <Col span={10}>
                        <Card title="修改菜单数据" hoverable key={this.props.menusData}>
                            <TextArea
                                ref={this.TextAreaDom}
                                rows={20}
                                defaultValue={this._DataFormat(this.props.menusData)}
                            />
                            <Button
                                type="primary"
                                onClick={this._EditData}
                                style={{float:'right',marginTop: '20px'}}
                            >确认</Button>
                        </Card>
                    </Col>
                    <Col span={9} offset={5}>
                        <Card title="备份数据" hoverable>
                            <p style={{whiteSpace: "pre-line"}}>{this._DataFormat(backupData)}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    // console.log("映射分发操作到组件属性上");
    return {
        updateMenusData: (menusData) => dispatch(updateMenusData(menusData))
    }
}

export default connect(state=>({...state}), mapDispatchToProps)(Menus)

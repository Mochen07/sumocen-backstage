import React, {Component} from "react"
import { Input, Button, Modal, Row, Col, Card } from 'antd';

import { getMenuListUpdate, getMenuList } from 'api/menu-api';
import {getUser} from "api/user-api"

const { TextArea } = Input;

export default class Menus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menusData: [],
            backupData: [
                {"id":1,"title":"首页","_key":"/home","icon":"home","parentID":0},
                {"id":2,"title":"个人信息","_key":"/user","icon":"user","parentID":0},
                {"id":3,"title":"菜单管理","_key":"/menus","icon":"appstore","parentID":0},
                {"id":4,"title":"题目管理","_key":"/questions","icon":"container","parentID":0,
                    "children":[
                        {"id":5,"title":"Java","_key":"/question/java","icon":"android","parentID":4},
                        {"id":6,"title":"Python","_key":"/question/python","icon":"bug","parentID":4},
                        {"id":7,"title":"H5","_key":"/question/h5","icon":"html5","parentID":4}
                    ]
                },
                {"id":8,"title":"统计","_key":"/charts","icon":"area-chart","parentID":0,
                    "children":[
                        {"id":9,"title":"柱形图","_key":"/charts/bar","icon":"bar-chart","parentID":8},
                        {"id":10,"title":"折线图","_key":"/charts/line","icon":"line-chart","parentID":8},
                        {"id":11,"title":"饼图","_key":"/charts/pie","icon":"pie-chart","parentID":8}
                    ]
                }
            ],
            loading: false
        }

        this.TextAreaDom = React.createRef()
    }

    componentDidMount() {
        // 获取菜单列表
        getMenuList(getUser().id).then(result => {
            console.log(result, "菜单数据")
            if (result.status === 200) {
                this.setState({
                    menusData: result.data
                })
            }
        })
    }

    _DataFormat = (data) => {
        let formatString = JSON.stringify(data)
        formatString = formatString.replace(/(},)|(\[)|(\])/g, "$1$2$3\n")
        return formatString
    }

    _EditData = () => {
        Modal.confirm({
            title: '提示',
            content: '确认使用当前菜单配置信息？',
            maskClosable: true,
            onOk:() => {
                const currentEdit = JSON.parse(this.TextAreaDom.current.state.value.replace(/\n/g, ""))
                console.log(currentEdit)
                const params = {
                    username: 'admin',
                    menus: currentEdit
                }
                getMenuListUpdate(params).then(result => {
                    console.log(result)
                })
            },
            onCancel() {console.log('Cancel');},
        });
    }

    render() {
        const {menusData, loading, backupData} = this.state
        return (
            <div>
                <Row>
                    <Col span={11} key={menusData.length}>
                        <Card title="备份数据" hoverable>
                            <TextArea
                                ref={this.TextAreaDom}
                                rows={20}
                                defaultValue={this._DataFormat(menusData)}
                            />
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={this._EditData}
                                style={{float:'right',marginTop: '20px'}}
                            >确认</Button>
                        </Card>
                    </Col>
                    <Col span={10} offset={2}>
                        <Card title="备份数据" hoverable>
                            <p style={{whiteSpace: "pre-line"}}>{this._DataFormat(backupData)}</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

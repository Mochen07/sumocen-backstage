import React, {Component} from "react"
import {Button, Card, Table} from 'antd';

export default class DocList extends Component {
    state = {
        dataSource: [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            },
        ],
        pagination: {
            totalSize: 0,
            pageSize: 4
        }
    }

    ;

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            align: 'center',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
        },
    ];

    // 添加编辑跳转
    _addEdit (data) {
        this.props.history.push('/document/add-edit',  {data: data})
    }


    render() {
        const {pagination, dataSource} = this.state

        let addBtn = (
            <Button type='primary'
                    onClick={() => this._addEdit()}
            >添加新idea</Button>
        )

        return (
            <Card title="文档列表" extra={addBtn}>
                <Table
                    columns={this.columns}
                    bordered
                    dataSource={dataSource}
                    pagination={{
                        total: pagination.totalSize,
                        pageSize: pagination.pageSize,
                        onChange: (pageNum, pageSize) => {}
                    }}
                />
            </Card>
        )
    }
}

import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, message, Image } from 'antd'
import { formatTime } from 'tools/date-tool'
import { emptyTextChange } from 'tools/utils'
import './article.less'

import { reqArticleList, reqArticleDelete } from 'api/article'

export default class Article extends Component {
  state = {
    columns: [
      {
        title: '标题',
        width: 230,
        dataIndex: 'title',
        key: 'title',
        align: 'center',
      },
      {
        title: '海报',
        width: 230,
        dataIndex: 'poster',
        key: 'poster',
        align: 'center',
        render: (url) => {
          return (
            <span>
              <Image
                width={75}
                height={75}
                src={(url !== '海报' && url)||require('../../assets/images/default.png')}
              />
            </span>
          )
        },
      },
      {
        title: '表述',
        width: 230,
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        render: (val) => {
          return (
            <span>{emptyTextChange(val)}</span>
          )
        }
      },
      {
        title: '浏览量',
        width: 80,
        dataIndex: 'views',
        key: 'views',
        align: 'center',
      },
      {
        title: '喜欢量',
        width: 80,
        dataIndex: 'likes',
        key: 'likes',
        align: 'center',
      },
      {
        title: '评论量',
        width: 80,
        dataIndex: 'comment',
        key: 'comment',
        align: 'center',
      },
      {
        title: '最后更新时间',
        width: 230,
        dataIndex: 'updatedTime',
        key: 'updatedTime',
        align: 'center',
        render: (val) => {
          return <span>{formatTime(val, 'ago')}</span>
        },
      },
      {
        title: '操作',
        width: 130,
        dataIndex: 'operate',
        key: 'operate',
        align: 'center',
        render: (val, row) => {
          return (
            <div>
              <Button type="link" onClick={() => this.handleTable(1, row)}>编辑</Button>
              <Popconfirm
                title="确认删除?"
                placement="bottom"
                onConfirm={() => this.handleTable(2, row)}
                okText="是"
                cancelText="否"
              >
                <Button type="link">删除</Button>
              </Popconfirm>
            </div>
          )
        },
      },
    ],
    dataSource: [],
    pagination: {
      page: 1,
      pageSize: 10, // 后端服务固定值
      total: 0,
    },
  }

  componentDidMount() {
    this._reqArticleList()
  }

  _reqArticleList = (pageNum = 1) => {
    reqArticleList(pageNum).then((res) => {
      this.setState({
        dataSource: res.data.list,
        pagination: Object.assign(this.state.pagination, {
          total: res.data.pagination.total,
          page: pageNum,
        }),
      })
    })
  }

  // 添加编辑跳转
  _addEdit(data) {
    this.props.history.push('/article/add-edit')
  }

  // 表格操作
  handleTable(type, row) {
    // type 1编辑 2删除
    switch (type) {
      case 1:
        this.props.history.push('/article/add-edit', { _id: row._id })
        break;
      case 2:
        reqArticleDelete({_id: row._id}).then(() => {
          message.success('删除成功')
          this._reqArticleList()
        })
        break;
      default:
        console.log('表格操作无响应')
    }
  }

  render() {
    const { columns, pagination, dataSource } = this.state

    return (
      <div style={{ height: '100%' }}>
        <div className="page-header">
          <Button
            className="addArticle"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => this._addEdit()}
          >
            新增文章
          </Button>
          <Table
            columns={columns}
            bordered
            dataSource={dataSource}
            rowKey={(record) => record._id}
            pagination={{
              total: dataSource.total,
              pageSize: pagination.pageSize,
              showTotal: (total => `共 ${total} 篇`),
              onChange: (pageNum, pageSize) => {
                this._reqArticleList(pageNum)
              },
            }}
          />
        </div>
      </div>
    );
  }
}

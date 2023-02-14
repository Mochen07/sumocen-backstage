import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { timeFormat } from 'tools/date-tool'
import './article.less'

import { getArticleList } from 'api/article'

export default class Document extends Component {
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
        title: '表述',
        width: 230,
        dataIndex: 'description',
        key: 'description',
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
              <img
                src={
                  (url !== '海报' && url) ||
                  require('../../assets/images/default.png')
                }
                alt=""
                className="table-image"
              />
            </span>
          )
        },
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
          return <span>{timeFormat(val)}</span>
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
    this._getArticleList()
  }

  _getArticleList = (pageNum = 1) => {
    getArticleList(pageNum).then((res) => {
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
    this.props.history.push('/article/add-edit', { data: data })
  }

  render() {
    const { columns, pagination, dataSource } = this.state

    return (
      <div style={{ height: '100%' }}>
        <div className="page-header">
          <Button
            className="addArticle"
            icon="plus"
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
              onChange: (pageNum, pageSize) => {
                this._getArticleList(pageNum)
              },
            }}
          />
        </div>
      </div>
    )
  }
}

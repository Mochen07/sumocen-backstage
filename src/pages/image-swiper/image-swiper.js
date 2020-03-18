import React, {Component} from "react"
import {Card, Button, Table, Divider, Popconfirm, message, Modal} from 'antd'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import 'pages/image-swiper/image-swiper.less'

import {getSwiperList, deleteSwiper} from 'api/image-swiper'

const type = 'DragbleBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: item => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

export default class ImageSwiper extends Component {
    state = {
        swiperList: [],
        showSwiper: {},
        visible: false,
        pagination: {
            totalSize: 0,
            pageSize: 4
        }
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: '预览',
            dataIndex: 'url',
            key: 'url',
            align: 'center',
            render: (url) => {
                return (
                    <span>
                    <img src={url} alt="" className="table-image"/>
                </span>
                )
            }
        },
        {
            title: '介绍',
            dataIndex: 'info',
            key: 'info',
            align: 'center',
            ellipsis: true,
        },
        {
            title: '链接',
            dataIndex: 'link',
            key: 'link',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            width: 500,
            render: (text, record) => {
                return (
                    <span>
                        <Button onClick={() => {this._showSwiperImage(record)}}>查看图片</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this._addEditSwiper(record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={() => {
                                console.log('删除')
                                deleteSwiper(record._id).then(result => {
                                    if (result.status===200) {
                                        message.success('删除成功')
                                        this._getSwiperList()
                                    } else {
                                        message.error('删除失败')
                                    }
                                })
                            }}
                            okText="是"
                            cancelText="否"
                        >
                            <Button>删除</Button>
                        </Popconfirm>
                    </span>
                )
            }
        },
    ];

    componentDidMount() {
        this._getSwiperList()
    };

    // 添加编辑swiper
    _addEditSwiper(data) {
        this.props.history.push('/image/add-edit',  {swiperData: data})
    }

    // 获取轮播图数据
    _getSwiperList = () => {
        getSwiperList().then(result => {
            console.log(result.data, '获取轮播图数据')
            this.setState({
                swiperList: result.data
            })
        })
    }

    // 查看图片
    _showSwiperImage(record) {
        this.setState({
            showSwiper: record,
            visible: true
        })
    }

    components = {
        body: {
            row: DragableBodyRow,
        },
    };

    moveRow = (dragIndex, hoverIndex) => {
        const { swiperList } = this.state;
        const dragRow = swiperList[dragIndex];

        this.setState(
            update(this.state, {
                swiperList: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                },
            }),
        );
    };

    render() {
        const {swiperList, visible, showSwiper, pagination} = this.state

        let addBtn = (
            <Button type='primary'
                    onClick={() => this._addEditSwiper()}
            >AddSwiper</Button>
        )

        return (
            <div>
                <Card title="Swiper管理" extra={addBtn}>
                    <DndProvider backend={HTML5Backend}>
                        <Table
                            id="drag-table"
                            columns={this.columns}
                            rowKey={'_id'}
                            bordered
                            dataSource={swiperList}
                            components={this.components}
                            onRow={(record, index) => ({
                                index,
                                moveRow: this.moveRow,
                            })}
                            pagination={{
                                total: pagination.totalSize,
                                pageSize: pagination.pageSize,
                                onChange: (pageNum, pageSize) => {}
                            }}
                        />
                    </DndProvider>
                </Card>

                <Modal
                    title={showSwiper.name}
                    visible={visible}
                    width={750}
                    cancelButtonProps={() => {}}
                    onOk={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <img src={showSwiper.url} alt="" className="image-format"/>
                </Modal>
            </div>
        )
    }
}

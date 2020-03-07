import React, {Component} from "react"
import {Card, Button, Table, Divider, Popconfirm} from 'antd'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import 'pages/image-swiper/image-swiper.less'

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

const columns = [
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
                        <Button onClick={() => {this._showAnswer(record)}}>查看图片</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => this._addEditQuestion(record)}>编辑</Button>
                        <Divider type="vertical" />
                        <Popconfirm
                            title="确定要删除吗?"
                            onConfirm={() => {
                                console.log('删除')
                                // deleteQuestion(record.id).then(result => {
                                //     if (!result.status) {
                                //         message.success('删除成功')
                                //         this._getQuestionList(this.state.currentCourse.id)
                                //     } else {
                                //         message.error('删除失败')
                                //     }
                                // })
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

export default class ImageSwiper extends Component {
    state = {
        data: [
            {
                id: '1',
                name: '春暖花开的季节',
                url: 'http://localhost:7676/uploads/upload_071b28fec309fca516c4e0ee720c87f2.jpg',
                link: '/user',
                info: '为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗为美丽生活写一首惬意的诗~'
            },
            {
                id: '2',
                name: '春暖花开的季节',
                url: 'http://localhost:7676/uploads/upload_071b28fec309fca516c4e0ee720c87f2.jpg',
                link: '/user',
                info: '为美丽生活写一首惬意的诗~'
            },
            {
                id: '3',
                name: '春暖花开的季节',
                url: 'http://localhost:7676/uploads/upload_071b28fec309fca516c4e0ee720c87f2.jpg',
                link: '/user',
                info: '为美丽生活写一首惬意的诗~'
            },
            {
                id: '4',
                name: '春暖花开的季节',
                url: 'http://localhost:7676/uploads/upload_071b28fec309fca516c4e0ee720c87f2.jpg',
                link: '/user',
                info: '为美丽生活写一首惬意的诗~'
            },
        ],
    };

    // 添加编辑swiper
    _addEditSwiper = () => {}

    components = {
        body: {
            row: DragableBodyRow,
        },
    };

    moveRow = (dragIndex, hoverIndex) => {
        const { data } = this.state;
        const dragRow = data[dragIndex];

        this.setState(
            update(this.state, {
                data: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragRow],
                    ],
                },
            }),
        );
    };

    render() {
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
                            columns={columns}
                            rowKey={'id'}
                            bordered
                            dataSource={this.state.data}
                            components={this.components}
                            onRow={(record, index) => ({
                                index,
                                moveRow: this.moveRow,
                            })}
                        />
                    </DndProvider>
                </Card>
            </div>
        )
    }
}

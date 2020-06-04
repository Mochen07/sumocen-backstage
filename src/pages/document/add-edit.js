import React, {Component} from "react"
import { Card } from 'antd';
import Markdown from "pages/document/components/markdown"

export default class AddEdit extends Component {
    state = {
        input:''
    }

    render() {
        return (
            <Card title="MarkDown编辑">
                <Markdown />
            </Card>
        )
    }
}

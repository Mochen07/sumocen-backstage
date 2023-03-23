import React, {Component} from "react"
import ReactMarkdown from 'react-markdown'
import { Input } from 'antd'

import './markdown.less'

const { TextArea } = Input

export default class Markdown extends Component {
    TextAreaDom = React.createRef()

    state = {
        document: ''
    }

    onChange = (e) => {
        this.setState({
            document: e.target.value
        })
    }

    render() {
        const {document} = this.state
        return (
            <div className='markdown'>
                <div className="md-left">
                    <TextArea
                        className="edit-input"
                        ref={this.TextAreaDom}
                        placeholder="markdown..."
                        onChange={this.onChange}
                        value={document}
                    />
                </div>
                <div className="md-right">
                    <ReactMarkdown
                        className="md-demo"
                        source={document}
                        escapeHtml={false}
                    />
                </div>
            </div>
        )
    }
}

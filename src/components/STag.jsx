import React from 'react'
import { Tag, Tooltip, } from 'antd';
import IconFont from 'tools/icon-font'

export default class STag extends React.Component {
  render() {
    const tag = this.props.tag
    const isLongTag = tag.name.length > 20
    const tagElem = (
      <Tag
        
        closable={!tag.useNum}
        onClose={() => this.props.handleClose(tag)}
        onClick={() => this.props.handleTagClick(tag)}
      >
        <IconFont type={tag.icon || 'slack-square-fill'} className="icon-font" />
        {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
        {!!tag.useNum ? (
          <span className="useNum">{tag.useNum}</span>
        ) : (
          ''
        )}
      </Tag>
    )
    return isLongTag ? (
      <Tooltip title={tag.name}>
        {tagElem}
      </Tooltip>
    ) : (
      tagElem
    )
  }
}
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Article from 'pages/article/article'
import AddEdit from 'pages/article/add-edit'

export default class Document extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Switch>
          <Route path={'/article/add-edit'} component={AddEdit} />
          <Route path={'/article'} component={Article} />
        </Switch>
      </div>
    )
  }
}

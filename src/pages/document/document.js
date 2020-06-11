import React, {Component} from 'react'
import {Switch, Route} from "react-router-dom"
import DocList from "pages/document/doc-list"
import AddEdit from "pages/document/add-edit"

export default class Document extends Component{

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Switch>
                    <Route path={'/document/add-edit'} component={AddEdit} />
                    <Route path={'/document'} component={DocList} />
                </Switch>
            </div>
        )
    }
}

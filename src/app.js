import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from 'pages/login/login'
import Admin from 'pages/admin/admin'
import store from "./store/index";
import {Provider} from "react-redux"

export default class App extends Component {

    render() {
        return(
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path={'/login'} component={Login} />
                        <Route path={'/'} component={Admin} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}


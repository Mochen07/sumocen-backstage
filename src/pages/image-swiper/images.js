import React, {Component} from 'react'
import {Switch, Route} from "react-router-dom"
import ImageSwiper from "pages/image-swiper/image-swiper"
import AddEditSwiper from "pages/image-swiper/add-edit-swiper"

export default class Images extends Component{

    render() {
        return (
            <div>
                <Switch>
                    <Route path={'/image/add-edit'} component={AddEditSwiper} />
                    <Route path={'/image'} component={ImageSwiper} />
                </Switch>
            </div>
        )
    }
}

import React, {Component} from "react"
import {Card, Button} from 'antd';
import Markdown from "pages/document/components/markdown"

export default class AddEdit extends Component {
    state = {
        input: '',
        isFullScreen: false
    }

    componentDidMount = () => {
        this.watchFullScreen()
    }

    fullScreen = () => {
        console.log('fullscreen:', this.state.isFullScreen);
        if (!this.state.isFullScreen) {
            this.requestFullScreen();
            this.state.isFullScreen = true;
        } else {
            this.exitFullscreen();
            this.state.isFullScreen = false;
        }
    };

    //进入全屏
    requestFullScreen = () => {
        console.log('requestFullScreen')
        var de = document.documentElement;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        }
    };

    //退出全屏
    exitFullscreen = () => {
        console.log('exitFullscreen')
        var de = document;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        }
    };

    //监听fullscreenchange事件
    watchFullScreen = () => {
        const _self = this;
        document.addEventListener(
            "webkitfullscreenchange",
            function () {
                _self.setState({
                    isFullScreen: document.webkitIsFullScreen
                });
            },
            false
        );
    };


    render() {
        const leftBtn = (
            <Button type="dashed" onClick={this.fullScreen}>全屏</Button>
        )

        return (
            <Card title="MarkDown编辑" extra={leftBtn}>
                <Markdown/>
            </Card>
        )
    }
}

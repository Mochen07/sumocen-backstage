import {ajax} from "./ajax"
import PubSub from 'pubsub-js'

// 获取左侧菜单
export const getMenuList = (id) => ajax(`/api/back/user/menus/${id}`)

//用户菜单配置
export const getMenuListUpdate = (data) => ajax('/api/back/user/menus', data, 'post')

// 面包屑信息的发布与订阅(可使用redux替代)
const MENUKEY = "MenuKey"

export const publishMenu = (data) => {
    PubSub.publish(MENUKEY, data);
}

export const subscribeMenu = (fc) => {
    PubSub.subscribe(MENUKEY, fc);
}

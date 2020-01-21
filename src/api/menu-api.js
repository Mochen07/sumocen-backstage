import {ajax} from "./ajax"
import PubSub from 'pubsub-js'

// 获取左侧菜单
export const getMenuList = () => ajax("api/menus/list")

// 获取菜单信息
export const getMenuListWithParentID = (parentID=0) => ajax("api/menus/listMenusWithParentID", {
    parentID
})

// 添加菜单
export const addMenu = (data) => {
    return ajax("api/menus/addMenu", data, "post")
}

export const updateMenu = (data) => {
    return ajax("api/menus/updateMenu", data, "post")
}

// 删除菜单
export const deleteMenu = (id) => ajax("api/menus/deleteMenu", {
    id
}, "post")

// 面包屑信息的发布与订阅
const MENUKEY = "MenuKey"

export const publishMenu = (data) => {
    PubSub.publish(MENUKEY, data);
}

export const subscribeMenu = (fc) => {
    PubSub.subscribe(MENUKEY, fc);
}

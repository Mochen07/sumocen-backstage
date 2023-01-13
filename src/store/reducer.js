import {MENUS_DATA} from './actionType'
import defaultMenus from 'config/default-menus'

// 默认的数据
const defaultState = {
    menusData: defaultMenus,
}

export default (state=defaultState, action) => {
    console.log(action, 'action是什么呢')
    switch (action.type) {
        // 更新菜单信息
        case MENUS_DATA:
            return Object.assign({}, state, {menusData: action.menusData.length ? action.menusData : state.menusData})
        // ...
        case 1:
            return Object.assign({}, state, {})
        default:
            return state
    }
}

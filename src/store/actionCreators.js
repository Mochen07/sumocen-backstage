import {MENUS_DATA} from 'store/actionType'
import {getMenuList} from "api/menu-api"
import {getUser} from "api/user-api"

// 获取菜单数据
export const getMenusData = () => {
    return (dispatch)=>{
        getMenuList(getUser().id).then((result)=>{
            if(result.status === 200){
                const menusData = result.data;
                dispatch({
                    type: MENUS_DATA,
                    menusData
                })
            }
        });
    }
}

// 修改菜单数据
export const updateMenusData = (menusData) => {
    return (dispatch)=>{
        dispatch({
            type: MENUS_DATA,
            menusData
        })
    }
}

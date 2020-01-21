import {ajax} from "./ajax"
import {saveObj, getObj, removeObj} from "./../tools/cache-tool"

// 登陆持久化公共变量
const USERKEY = "USERKEY"

export const checkLogin = (account, password) => {
    return ajax("api/users/login",{
        account,
        password
    },"post")
}

export const updateUser = (data) => {
    return ajax("api/users/update", data, "post")
}

export const saveUser = (obj) => {
    saveObj(USERKEY, obj)
}

export const getUser = () => {
    return getObj(USERKEY)
}

export const removeUser = () => {
    removeObj(USERKEY)
}

export const isLogin = () => {
    let user = getObj(USERKEY)

    return !!user.id
}

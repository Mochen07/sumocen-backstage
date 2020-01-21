/*
* @ store一个简单的接口来实现跨浏览器的本地存储
* */
import store from "store"

export const saveObj = (key, obj) => {
    store.set(key, obj)
}

export const getObj = (key) => {
    return store.get(key) || {}
}

export const removeObj = (key) => {
    store.remove(key)
}

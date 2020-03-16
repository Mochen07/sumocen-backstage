import {ajax} from "./ajax"

// 获取轮播图数据
export const getSwiperList = () => ajax('/api/swiper/list')

// 删除指定轮播图数据
export const deleteSwiper = (id) => ajax('/api/back/swiper/remove', {id}, 'post')

// 插入swiper数据
export const addSwiper = (data) => ajax('/api/back/swiper/add', data, 'post')

// 修改swiper数据
export const editSwiper = (data) => ajax('/api/back/swiper/edit', data, 'post')

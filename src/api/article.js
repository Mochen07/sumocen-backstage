import {ajax} from "./ajax"

// 文章列表
export const getArticleList = (page) => ajax('/api/article/list?page='+page)

// 新增编辑文章
export const reqArticleAddEdit = (data) => ajax('/api/article/addEdit', data, 'post')
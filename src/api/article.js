import {ajax} from "./ajax"

// 文章列表
export const reqArticleList = (page) => ajax('/api/article/list?page='+page)

// 新增编辑文章
export const reqArticleAddEdit = (data) => ajax('/api/article/addEdit', data, 'post')

// 文章详情
export const reqArticleDetail = (data) => ajax('/api/article/detail', data, 'post')

// 删除文章
export const reqArticleDelete = (data) => ajax('/api/article/delete', data, 'post')
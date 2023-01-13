import {ajax} from "./ajax"

// 文章列表
export const getArticleList = (page) => ajax('/api/article/list?page='+page)
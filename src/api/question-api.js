import {ajax} from './ajax'

// 获取当前科目的title 及 id
export const getCategory = (key) => ajax("api/menus/getCourseID", {
    key
})

// 获取当前课程的题
export const getQuestion = (courseID, pageNum=1, pageSize=3) => ajax("api/questions/list", {
    courseID,
    pageNum,
    pageSize
})

// 删除当前题目
export const deleteQuestion = (id) => ajax("api/questions/deleteQuestion", {
    id
}, "post")

// 请求所有的课程
export const getAllCourse = () => ajax("api/menus/getAllCourse")

// 修改科目title, content, answer, categoryID
export const addQuestion = (data) => ajax("api/questions/addQuestion", data, "post")

// 更新课程 id, title, content, answer, categoryID
export const updateQuestion = (data) => ajax("api/questions/updateQuestion", data, "post")

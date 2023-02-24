import {ajax} from "./ajax"

// 标签列表
export const reqTagList = () => ajax('/api/tag/list')

// 新增编辑标签
export const reqTagAddEdit = (data) => ajax('/api/tag/addEdit', data, 'post')

// 删除标签
export const reqTagDelete = (data) => ajax('/api/tag/delete', data, 'post')
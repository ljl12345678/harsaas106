import request from '@/utils/request'
// 获取组织架构的数据
export function getdepartments() {
    return request({
        url: '/company/department'
    })
}
// 删除部门
export function delPartmnet(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'delete'
    })
}
export function addPartmnet(data) {
    return request({
        url: '/company/department',
        method: 'post',
        data
    })
}
// 获取部门详情
export function getPartmnetdetail(id) {
    return request({
        url: `/company/department/${id}`
    })
}
export function updatePartmnet(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'post',
        data
    })
}

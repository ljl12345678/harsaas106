import request from '@/utils/request'
export function getrolelist(params) {
    return request({
        url: '/sys/role',
        params
    })
}
export function getcompanyinfo(companyid) {
    return request({
        url: `/company/${companyid}`
    })
}
export function delrole(id) {
    return request({
        url: `/sys/role/${id}`,
        method: 'delete'
    })
}
// 读取角色详情
export function getroledetail(id) {
    return request({
        url: `/sys/role/${id}`
    })
}
export function updatalrole(data) {
    return request({
        url: `/sys/role/${data.id}`,
        method: 'put',
        data
    })
}
export function addrole(data) {
    return request({
        url: '/sys/role',
        method: 'post',
        data
    })
}

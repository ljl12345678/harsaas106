import request from '@/utils/request'
export function getemploysimple() {
    return request({
        url: '/sys/user/simple'
    })
}
export function getemploylist(params) {
    return request({
        url: '/sys/user',
        params
    })
}
export function delemploy(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}
export function addEmployee(data) {
    return request({
        method: 'post',
        url: '/sys/user',
        data
    })
}
// 参数data是数组类型
export function importEmployee(data) {
    return request({
        method: 'post',
        url: '/sys/user/batch',
        data
    })
}
// 保存用户基本信息
export function saveuserdetailbyid(data) {
    return request({
        method: 'put',
        url: `/sys/user/${data.id}`,
        data
    })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}
export function assignRoles(data) {
    return request({
        url: '/sys/user/assignRoles',
        data,
        method: 'put'
    })
}

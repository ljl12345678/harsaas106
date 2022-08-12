import request from '@/utils/request'
// 封装登录接口
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data
    })
}

export function getInfo() {
    return request({
        url: '/sys/profile',
        method: 'POST'
    })
}
export function getuserdatebyid(id) {
    return request({
        url: `/sys/user/${id}`
    })
}
export function logout() {

}

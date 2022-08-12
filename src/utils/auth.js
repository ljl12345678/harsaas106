import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const timekey = 'hrsaas-timestamp-key' // 设置一个独一无二的key
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
export function gettimestep() {
    return Cookies.get(timekey)
}
export function settimestep() {
    return Cookies.set(timekey, Date.now())
}
export function tranListToTreeData(list, rootValue) {
    var arr = []
    list.forEach(item => {
        if (item.pid === rootValue) {
            const children = tranListToTreeData(list, item.id)
            if (children.length) {
                item.children = children
            }
            arr.push(item)
        }
    })
    return arr
}

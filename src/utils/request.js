import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import store from '@/store'
import { gettimestep } from '@/utils/auth'
const timeout = 3600
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
})
service.interceptors.request.use(
    // 请求的配置信息
    // 注入token
    config => {
        if (store.getters.token) {
            if (checktimeout()) {
                store.dispatch('user/logout')
                router.push('/login')
                return Promise.reject(new Error('token超时了'))
            }
            config.headers['Authorization'] = `Bearer ${store.getters.token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        const { message, success, data } = response.data
        if (success) {
            return data
        } else {
            Message.error(message)
            return Promise.reject(new Error(message))
        }
    },
    error => {
        Message.error(error.message) // 提示错误消息
        return Promise.reject(error)
    })

function checktimeout() {
    const cuurenttime = Date.now()
    const timestep = gettimestep()
    return (cuurenttime - timestep) / 1000 > timeout
}
export default service

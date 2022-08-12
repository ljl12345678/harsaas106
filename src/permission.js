import router from '@/router'
import store from './store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whitelist = ['/login', '/404'] // 自定义白名单
router.beforeEach(async(to, from, next) => {
    nprogress.start()
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
            console.log(store.getters.token)
        } else {
            if (!store.getters.userid) {
                await store.dispatch('user/getuserInfo')
            }
            next()
        }
    } else {
        if (whitelist.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }
    nprogress.done() // 手动切换地址时关闭进度条
})
router.afterEach(() => {
    nprogress.done() // 自动切换路由是关闭进度条
})

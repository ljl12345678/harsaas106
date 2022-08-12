import { getToken, setToken, removeToken, settimestep } from '@/utils/auth'
import { login, getInfo, getuserdatebyid } from '@/api/user'
export default {
    namespaced: true,
    state: {
        token: getToken(),
        userinfo: {}
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        removeToken(state) {
            state.token = null
            removeToken()
        },
        changeinfo(state, result) {
            state.userinfo = result
        },
        removeinfo(state) {
            state.userinfo = {}
        }
    },
    actions: {
        async login(context, data) {
            const result = await login(data)
            context.commit('setToken', result)
            settimestep()
        },
        async getuserInfo(context) {
            const result = await getInfo()
            const baseresule = await getuserdatebyid(result.userId)
            context.commit('changeinfo', { ...result, ...baseresule })
            return result // 这里给后期做权限时留下的伏笔
        },
        logout(context) {
            context.commit('removeToken')
            context.commit('removeinfo')
        }
    }
}

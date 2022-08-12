import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import * as directives from '@/directives'
import * as filters from '@/filters'
import '@/icons' // icon
import '@/permission' // permission control
import Component from '@/components/index'
import Print from 'vue-print-nb'
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use({
        Print
    })
    // 祖册自定义指令
Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
})
Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
    // 如果想要中文版element-ui按如下方式声明
    // Vue.use(ElementUI)
    // console.log(directives)
Vue.config.productionTip = false
Vue.use(Component)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

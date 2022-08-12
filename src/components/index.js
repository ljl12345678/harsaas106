// 负责所有全局自定义组件的注册
import Pagetools from './pagetools'
import Uploadelsx from './uploadelsx'
import Imageupload from './ImageUpload'
export default {
    install(vue) {
        vue.component('Pagetools', Pagetools)
        vue.component('Uploadelsx', Uploadelsx)
        vue.component('Imageupload', Imageupload)
    }
}

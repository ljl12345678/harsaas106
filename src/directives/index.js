// 负责管理所有的自定义指令
export const imagerror = {
    // 指令对象会在dom节点后执行
    inserted(dom, options) {
        dom.src = dom.scr || options.value
        dom.onerror = function() {
            dom.scr = options.value // 默认值
        }
    },
    componentUpdated(dom, options) {
        dom.src = dom.src || options.value
    }
}

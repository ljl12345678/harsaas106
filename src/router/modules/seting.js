import Layout from '@/layout'
export default {
    path: '/seting',
    name: 'seting',
    component: Layout,
    children: [{
        path: '',
        component: () =>
            import ('@/views/setting'),
        meta: {
            title: '设置',
            icon: 'setting'
        }
    }]
}

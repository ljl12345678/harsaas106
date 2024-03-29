import Layout from '@/layout'
export default {
    path: '/permission',
    name: 'permission',
    component: Layout,
    children: [{
        path: '',
        component: () =>
            import ('@/views/permission'),
        meta: {
            title: '权限',
            icon: 'lock'
        }
    }]
}

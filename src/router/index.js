const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/demo/table',
    name: 'demo-table',
    component: () => import('@/examples/table.vue')
  },
  {
    path: '/demo/app-layout',
    name: 'demo-app-layout',
    component: () => import('@/examples/useLayout/index.vue')
  }
]

export default routes

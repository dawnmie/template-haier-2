const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/demo/table',
    name: 'demo-table',
    component: () => import('@/views/demo/table.vue')
  }
]

export default routes

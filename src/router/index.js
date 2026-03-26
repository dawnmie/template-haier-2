const routes = [
  {
    path: '/',
    name: 'welcome',
    component: () => import('@/views/welcome.vue')
  }
]

export default routes

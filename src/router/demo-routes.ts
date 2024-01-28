export default [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/DemoView.vue'),
  },
  {
    path: '/demo/search',
    name: 'demo-search',
    component: () => import('@/views/DemoSearchView.vue'),
  },
]

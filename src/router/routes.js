const routes = [
  {
    path: '/',
    component: () => import('src/layouts/main.vue'),
    children: [{ path: '', component: () => import('src/pages/main.vue') }],
  },
  {
    path: '*',
    component: () => import('src/pages/error.vue'),
  },
];

export default routes;

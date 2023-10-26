const routes = [
  { path: '/', name: 'designManage', component: () => import(/* webpackChunkName: "home" */ '@/views/mall/index') },
];

export default routes;

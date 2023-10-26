const routes = [
  { path: '/', name: 'designManage', component: () => import(/* webpackChunkName: "home" */ '@/views/Home') },
  { path: '/list', name: 'listPage', component: () => import(/* webpackChunkName: "about" */ '@/views/About') },
];

export default routes;

const routes = [
  { path: '/', name: 'designManage', component: () => import(/* webpackChunkName: "home" */ '@/views/mall/index') },
  {
    path: '/mall',
    name: 'mall',
    // component: () => import('@/views/mall'),
    redirect: '/mall/goods',
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: () => import('@/views/mall/goods'),
        redirect: '/mall/goods/goods-manager',
        children: [
          {
            path: 'goods-manager',
            name: 'goods-manager',
            component: () => import('@/views/mall/goods/goods-manager/index'),
          },
          // {
          //   path: 'goods-edit',
          //   name: 'goods-edit',
          //   component: () => import('@/views/mall/goods/goods-manager/edit'),
          // },
          // {
          //   path: 'group-manager',
          //   name: 'group-manager',
          //   component: () => import('@/views/mall/goods/group-manager/index'),
          // },
        ]
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('@/views/mall/store'),
        redirect: '/mall/store/navigation-tpl',
        children: [
          {
            path: 'navigation-tpl',
            name: 'navigation-tpl',
            component: () => import('@/views/mall/store/navigation-tpl'),
          },
          {
            path: 'search-tpl',
            name: 'search-tpl',
            component: () => import('@/views/mall/store/search-tpl'),
          },
          {
            path: 'category-tpl',
            name: 'category-tpl',
            component: () => import('@/views/mall/store/category-tpl'),
          },
          {
            path: 'list-tpl',
            name: 'list-tpl',
            component: () => import('@/views/mall/store/list-tpl'),
          },
        ]
      }
    ]
  }
];

export default routes;

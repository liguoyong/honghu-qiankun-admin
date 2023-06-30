import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layout/index.vue'

export const routes = [
  { path: '/',
  name: 'home',
  component: Layout,
  meta: {
    title: "首页",
  },
  children: [
    {
      path: "/home",
      name: "home",
      component:() => import(/* webpackChunkName: "home" */ '../views/Home/index.vue'),
      meta: {
        title: "首页",
      }
    }
  ],
},
  { path: '/user',
   name: 'user',
   component: Layout,
   meta: {
    title: "用户",
  },
  children: [{
    path: "list",
    name: "operational-list",
    component: () => import(/* webpackChunkName: "operational" */ '../views/User/index.vue'),
    meta: {
      title: "用户列表",
    },
  }]
  },
  { path: '/operational',
   name: 'operational',
   component: Layout,
   meta: {
    title: "操作云",
  },
  children: [{
    path: "cloud",
    name: "operational-cloud",
    component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
    meta: {
      title: "操作云",
    },
    children: [{
      path: ":path",
      name: 'operational-cloud-path',
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      meta: {
        title: "操作云",
      },
    }]
  }]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

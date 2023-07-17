import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layout/index.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: { name: 'homePage' },
    id: '1',
    meta: {
      title: "首页",
      icon: 'House',
    },
    children: [
      {
        path: "home",
        name: "homePage",
        component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue'),
        id: '1-1',
        meta: {
          title: "首页",
        }
      }
    ],
  },
  {
    path: '/noteCloud',
    name: 'noteCloud',
    component: Layout,
    id: '2',
    meta: {
      title: "云笔记",
      icon: "Management"
    },
    children: [{
      path: "note",
      name: "noteCloud-note",
      component: () => import(/* webpackChunkName: "notecloudnote" */ '../views/NoteCloud/note/index.vue'),
      id: '2-1',
      meta: {
        title: "笔记",
      },
    },{
      path: "log",
      name: "noteCloud-log",
      component: () => import(/* webpackChunkName: "notecloudlog" */ '../views/NoteCloud/log/index.vue'),
      id: '2-2',
      meta: {
        title: "日志",
      },
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    id: '3',
    meta: {
      title: "用户",
      icon: "User"
    },
    children: [{
      path: "list",
      name: "operational-list",
      component: () => import(/* webpackChunkName: "operational" */ '../views/User/index.vue'),
      id: '3-1',
      meta: {
        title: "用户列表",
      },
    }]
  },
  {
    path: '/operational',
    name: 'operational',
    component: Layout,
    id: '4',
    meta: {
      title: "操作云",
      icon: "MostlyCloudy"
    },
    children: [{
      path: "cloud",
      name: "operational-cloud",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      id: '4-1',
      meta: {
        title: "操作云",
      }
    },
    {
      path: "capability",
      name: "operational-capability",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      id: '4-2',
      meta: {
        title: "赋能控制",
      }
    },
    {
      path: "designer",
      name: "operational-designer",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      id: '4-3',
      meta: {
        title: "设计器控制",
      }
    },
  ]
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

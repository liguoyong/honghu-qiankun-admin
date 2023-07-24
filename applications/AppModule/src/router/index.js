import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../layout/index.vue'
import _ from 'lodash'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: { name: 'homePage' },
    meta: {
      title: "首页",
      icon: 'House',
    },
    children: [
      {
        path: "home",
        name: "homePage",
        component: () => import(/* webpackChunkName: "home" */ '../views/Home/index.vue'),
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
    meta: {
      title: "云笔记",
      icon: "Management"
    },
    children: [{
      path: "note",
      name: "noteCloud-note",
      component: () => import(/* webpackChunkName: "notecloudnote" */ '../views/NoteCloud/note/index.vue'),
      meta: {
        title: "笔记",
      },
    }, {
      path: "log",
      name: "noteCloud-log",
      component: () => import(/* webpackChunkName: "notecloudlog" */ '../views/NoteCloud/log/index.vue'),
      meta: {
        title: "日志",
      },
    }]
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    meta: {
      title: "用户",
      icon: "User"
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
  {
    path: '/operational',
    name: 'operational',
    component: Layout,
    meta: {
      title: "操作云",
      icon: "MostlyCloudy"
    },
    children: [{
      path: "cloud",
      name: "operational-cloud",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      meta: {
        title: "操作云中心",
      }
    },
    {
      path: "capability",
      name: "operational-capability",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      meta: {
        title: "赋能控制",
      }
    },
    {
      path: "designer",
      name: "operational-designer",
      component: () => import(/* webpackChunkName: "operational" */ '../views/Operational/index.vue'),
      meta: {
        title: "设计器控制",
      }
    },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
    hidden: true,
    meta: {
      title: "登录"
    }
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (_.isEmpty(history.state.current)) {
    _.assign(history.state, { current: from.fullPath });
  }
  next();
});
export default router;

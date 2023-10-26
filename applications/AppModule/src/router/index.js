import { createRouter, createWebHistory } from "vue-router";
import Layout from "../layout/index.vue";
import _ from "lodash";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: { name: "homePage" },
    meta: {
      title: "首页",
      icon: "House",
    },
    children: [
      {
        path: "home",
        name: "homePage",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home/index.vue"),
        meta: {
          title: "首页",
          activeMenu: '/'
        },
      },
    ],
  },
  {
    path: "/note",
    name: "note",
    component: Layout,
    redirect: { name: "NoteIndex" },
    meta: {
      title: "笔记管理中心",
      icon: "Management",
    },
    children: [
      {
        path: "index",
        name: "NoteIndex",
        component: () =>
          import(
            /* webpackChunkName: "noteNote" */ "../views/NoteCloud/note/index.vue"
          ),
        meta: {
          title: "笔记",
          activeMenu: '/note/index'
        },
      },
      {
        path: "plan",
        name: "notePlan",
        component: () =>
          import(
            /* webpackChunkName: "notePlan" */ "../views/NoteCloud/note/plan.vue"
          ),
        meta: {
          title: "计划",
          activeMenu: '/note/plan'
        },
      }
    ],
  },
  {
    path: "/life",
    name: "noteCloud",
    component: Layout,
    redirect: { name: "lifePlan" },
    meta: {
      title: "生活管理中心",
      icon: "GoodsFilled",
    },
    children: [
      {
        path: "plan",
        name: "lifePlan",
        component: () =>
          import(
            /* webpackChunkName: "lifePlan" */ "../views/Life/plan/index.vue"
          ),
        meta: {
          title: "人生计划",
          activeMenu: '/life/plan'
        },
      },
      {
        path: "pay",
        name: "lifePay",
        component: () =>
          import(
            /* webpackChunkName: "lifePay" */ "../views/Life/pay/index.vue"
          ),
        meta: {
          title: "收支管理",
          activeMenu: '/life/pay'
        },
      },
      {
        path: "bill",
        name: "lifeBill",
        component: () =>
          import(
            /* webpackChunkName: "lifeBill" */ "../views/Life/bill/index.vue"
          ),
        meta: {
          title: "账单管理",
          activeMenu: '/life/bill'
        },
      },
    ],
  },
  {
    path: "/work",
    name: "workMgr",
    component: Layout,
    redirect: { name: "workTodo" },
    meta: {
      title: "办公管理中心",
      icon: "GoodsFilled",
    },
    children: [
      {
        path: "todo",
        name: "workTodo",
        component: () =>
          import(
            /* webpackChunkName: "workTodo" */ "../views/Work/todo/index.vue"
          ),
        meta: {
          title: "待办事项",
          activeMenu: '/work/todo'
        },
      }
    ],
  },
  {
    path: "/design",
    name: "designMgr",
    component: Layout,
    redirect: { name: "designIndex" },
    meta: {
      title: "设计管理中心",
      icon: "GoodsFilled",
    },
    children: [
      {
        path: "index",
        name: "designIndex",
        component: () =>
          import(
            /* webpackChunkName: "designIndex" */ "../views/Design/design/index.vue"
          ),
        meta: {
          title: "设计配置",
          activeMenu: '/design/index'
        },
      }
    ],
  },
  {
    path: "/operational",
    name: "operational",
    component: Layout,
    redirect: { name: "tool" },
    meta: {
      title: "工具管理中心",
      icon: "MostlyCloudy",
    },
    children: [
      {
        path: "tool",
        name: "tool",
        component: () =>
          import(
            /* webpackChunkName: "operational" */ "../views/Tool/index.vue"
          ),
        meta: {
          title: "工具专区",
        },
      },
      {
        path: "tool/json",
        name: "toolJSON",
        hidden: true,
        component: () =>
          import(
            /* webpackChunkName: "toolJSON" */ "../views/Tool/components/json.vue"
          ),
        meta: {
          title: "工具中心-json",
          activeMenu: '/operational/tool'
        },
      },
      {
        path: "tool/svg",
        name: "toolSvgPreview",
        hidden: true,
        component: () =>
          import(
            /* webpackChunkName: "SvgPreviewJSON" */ "../views/Tool/components/SvgPreview.vue"
          ),
        meta: {
          title: "svg预览",
          activeMenu: '/operational/tool'
        },
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    redirect: { name: "userList" },
    meta: {
      title: "用户管理",
      icon: "User",
    },
    children: [
      {
        path: "list",
        name: "userList",
        component: () =>
          import(
            /* webpackChunkName: "userList" */ "../views/User/index.vue"
          ),
        meta: {
          title: "用户列表",
          activeMenu: '/user/list'
        },
      },
      {
        path: 'info',
        name: 'userInformation',
        meta: {
          title: '用户资料',
          activeMenu: '/user/info'
        },
        component: () =>
          import(
            /* webpackChunkName: "userInformation" */ "../views/User/information/index.vue"
          )
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login/index.vue"),
    hidden: true,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register/index.vue"),
    hidden: true,
    meta: {
      title: "注册",
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

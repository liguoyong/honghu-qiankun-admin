import Layout from "@/layout/index.vue";
export default {
  path: "/work",
  name: "workMgr",
  component: Layout,
  redirect: { name: "workTodo" },
  meta: {
    title: "办公管理中心",
    icon: "SuitcaseLine",
  },
  children: [
    {
      path: "todo",
      name: "workTodo",
      component: () =>
        import(
          /* webpackChunkName: "workTodo" */ "@/views/Work/todo/index.vue"
        ),
      meta: {
        title: "待办事项",
        activeMenu: '/work/todo'
      },
    },
    {
      path: "task",
      name: "workTask",
      component: () =>
        import(
          /* webpackChunkName: "workTask" */ "@/views/Work/task/index.vue"
        ),
      meta: {
        title: "任务管理",
        activeMenu: '/work/task'
      },
    },
    {
      path: "requirement",
      name: "workRequirement",
      component: () =>
        import(
          /* webpackChunkName: "workRequirement" */ "@/views/Work/requirement/index.vue"
        ),
      meta: {
        title: "需求管理",
        activeMenu: '/work/requirement'
      },
    }
  ],
}

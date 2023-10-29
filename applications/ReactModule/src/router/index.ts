import { lazy } from "react";
import Home from "../views/index";
// const Home = lazy(
//   () => import(/* webpackChunkName: "index" */ "@/views/index/index.tsx")
// );
const NullPage = lazy(
  () => import(/* webpackChunkName: "404" */ "@/views/404/index.tsx")
);
const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/index",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "*",
    component: NullPage,
    meta: {
      title: "404",
    },
  },
];

export default routes;

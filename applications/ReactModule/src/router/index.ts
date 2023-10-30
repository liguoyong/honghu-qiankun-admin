import Home from '../views/index/index.tsx';
import Editor from '../views/editor/index.tsx'
import Err404 from '../views/404/index.tsx'
const routers = [
  {
    title: '首页',
    path: '/',
    component: Home,
  },
  {
    title: '编辑器',
    path: '/editor',
    component: Editor,
  },
  {
  	title: '找不到页面',
    path: '/404',
    component: Err404,
  }
];

export default routers;
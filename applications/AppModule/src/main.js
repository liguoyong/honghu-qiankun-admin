import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start, setDefaultMountApp } from 'qiankun';
import microApps from "./micro-app";
import '@/styles/index.scss';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
// import "nprogress/nprogress.css";
import router from './router'



import '@/icons' // icon
// import SvgIcon from './components/SvgIcon/index.vue'// svg component
// register globally
import { registerComponents } from './components/index'
const mainApp = createApp(App)
const pinia = createPinia()
registerComponents(mainApp)
// mainApp.component('svg-icon', SvgIcon)
mainApp.use(router).use(pinia).use(ElementPlus, { locale: zhCn }).mount('#mainapp')
import './permission'
// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
// function loader(loading) {
//     if (instance.isLoading) {
//       instance.isLoading = loading
//     }
//   }
// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    // loader
  };
});
registerMicroApps(apps, {
  beforeLoad: app => {
    console.log("before load app.name====>>>>>", app.name);
  },
  beforeMount: [
    app => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    }
  ],
  afterMount: [
    app => {
      console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
    }
  ],
  afterUnmount: [
    app => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    }
  ]
});
window.addEventListener('load', function () {
  console.log(document.getElementById('cnbi-viewport'), 'cnbi-viewport');
  const defaultPath = apps.find(item => window.location.pathname.includes(item.activeRule))
  defaultPath && setDefaultMountApp(defaultPath.activeRule);
})
start();

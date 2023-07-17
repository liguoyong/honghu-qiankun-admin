import { createApp } from 'vue'
import App from './App.vue'
import { registerMicroApps, start,setDefaultMountApp } from 'qiankun';
import microApps from "./micro-app";
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import  '@/styles/index.scss';
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
mainApp.use(router).use(pinia).use(ElementPlus).mount('#mainapp')




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
  // setDefaultMountApp("/vue3Vite");
  start();

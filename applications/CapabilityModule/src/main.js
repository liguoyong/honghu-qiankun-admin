import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import routes from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon-font/iconfont.css'
import '@/assets/icon-font/iconfont.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import i18n from './i18n.js'
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

// const app = createApp(App)

// app.config.productionTip = false

// app.use(ElementPlus).use(VueViewer).use(store).use(router).use(i18n).mount('#app')

let router = null;
let app = null;
let history = null;


function render(props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/xmind' : '/');
  console.log(history, window.__POWERED_BY_QIANKUN__, "history");
  router = createRouter({
    history,
    routes,
  });

  app = createApp(App);
  app.use(router).use(VueViewer).use(i18n).use(store).use(ElementPlus);
  app.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('%c ', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function mount(props) {
  storeTest(props);
  render(props);

  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
  //   console.log(instance.config.globalProperties.$route,"444444444");
}

export async function unmount() {
  console.log("vue3被卸载了");
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import './index.css'

function render(el = document.getElementById('root')) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// some code
renderWithQiankun({
  mount(props) {
    console.log("viteapp mount");
    render(props.container ? document.getElementById('cnbi-viewport') : document.getElementById('root'));
    // console.log(instance.config.globalProperties.$route,"444444444");
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props) {
    console.log("vite被卸载了");
    ReactDOM.unmountComponentAtNode(props.container ? document.getElementById('cnbi-viewport') : document.getElementById('root'));
  },
});

// 如果是作为子应用独立访问，直接调用挂载函数
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

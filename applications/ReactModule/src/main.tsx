import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

function render() {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// 如果是作为子应用独立访问，直接调用挂载函数
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出挂载函数给qiankun调用
export async function bootstrap() {}
export async function mount() {
  render();
}
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('root'));
}
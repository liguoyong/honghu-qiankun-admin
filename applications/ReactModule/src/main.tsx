import React from "react";
// import ReactDOM from 'react-dom/client'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import './assets/styles/index.css';
import 'antd/dist/reset.css';
let root = null;
function render(el = document.getElementById("root")) {
  console.log(el, 'el');
  
  root = createRoot(el);
  root.render(<App />);
  console.log(root, "rootrootrootrootrootrootrootroot");
}

// some code
renderWithQiankun({
  mount(props) {
    console.log(
      "viteapp mount",
      props,
      document.getElementById("cnbi-viewport")
    );
    render(
      props.container
        ? document.getElementById("cnbi-viewport")
        : document.getElementById("root")
    );
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props) {
    console.log("vite-react被卸载了", root);
    root &&
      root.unmount(
        props.container
          ? document.getElementById("cnbi-viewport")
          : document.getElementById("root")
      );
  },
});

// 如果是作为子应用独立访问，直接调用挂载函数
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

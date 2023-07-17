import store from "./store";
import { name } from "../package.json"
import appsConfig from "../../../config/apps.json"
const microApps = appsConfig.apps.filter(item => item.name !== name);
console.log(microApps,'microApps');
const apps = microApps.map((item) => {
  return {
    ...item,
    container: "#cnbi-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
    },
  };
});

export default apps;

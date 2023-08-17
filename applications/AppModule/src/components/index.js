import SvgIcon from './SvgIcon/index.vue'
import DataEmpty from './DataEmpty/index.vue'
import ComTable from './table/Table.vue'
import ComForm from './form/Form.vue'
import ComDialog from './Dialog.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const Components = {
  'svg-icon': SvgIcon,
  'data-empty': DataEmpty,
  'com-table': ComTable,
  'com-form': ComForm,
  'com-dialog': ComDialog
};

// Object.keys()会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
export const registerComponents = (app) => {
  Object.keys(Components).forEach((key) => {
    app.component(key, Components[key]);
  });
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
};

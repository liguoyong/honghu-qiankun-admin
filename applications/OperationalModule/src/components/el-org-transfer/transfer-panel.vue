<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox v-model="allChecked" @change="handleAllCheckedChange" :disabled="!data.length"
        :indeterminate="isIndeterminate" @click.prevent>
      </el-checkbox>
      <span class="select-label" :class="{'no-active':  !data.length}" @click.stop="collapseAll">{{ title }}</span>
      <span class="select-sum-text">{{ checkedSummary }}</span>
    </p>

    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-scrollbar>
        <my-tree ref="transferTree" style="height: 246px;" :props="props" :data="data" v-bind="$attrs" :node-key="nodeKey"
          :default-expanded-keys="[]" :filter-node-method="filterNodeMethod" show-checkbox
          @check-change="handleCheckChange">
        </my-tree>
      </el-scrollbar>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
import ElCheckbox from 'element-ui/packages/checkbox';
import ElInput from 'element-ui/packages/input';
import Locale from 'element-ui/src/mixins/locale';
import myTree from '../tree/tree'

export default {
  mixins: [Locale],

  name: 'ElTransferPanel',

  componentName: 'ElTransferPanel',

  components: {
    ElCheckboxGroup,
    ElCheckbox,
    ElInput,
    myTree,
    OptionContent: {
      props: {
        option: Object
      },
      render(h) {
        const getParent = vm => {
          if (vm.$options.componentName === 'ElTransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const panel = getParent(this);
        const transfer = panel.$parent || panel;
        return panel.renderContent
          ? panel.renderContent(h, this.option)
          : transfer.$scopedSlots.default
            ? transfer.$scopedSlots.default({ option: this.option })
            : <span>{this.option[panel.labelProp] || this.option[panel.keyProp]}</span>;
      }
    }
  },

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
    nodeKey: String,
    filterValue: String
  },

  data() {
    return {
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true,
      checkedIds: []
    };
  },

  watch: {
    checked(val, oldVal) {
      this.$emit('checked-change', val);
      // this.updateAllChecked();
      // if (this.checkChangeByUser) {
      //   const movedKeys = val.concat(oldVal)
      //     .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
      //   this.$emit('checked-change', val, movedKeys);
      // } else {
      //   this.$emit('checked-change', val);
      //   this.checkChangeByUser = true;
      // }
    },
    checkedIds(val, oldVal) {
      this.updateAllChecked();
      console.log(val, oldVal, 'val, oldVal', this.$refs.transferTree.getCheckedKeys());
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal)
          .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },
    data(val, oldVal) {
      // const checked = [];
      // const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
      // this.checked.forEach(item => {
      //   if (filteredDataKeys.indexOf(item) > -1) {
      //     checked.push(item);
      //   }
      // });
      this.checkChangeByUser = false;
      // this.checked = checked;
    },

    checkableData() {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (oldVal && val.length === oldVal.length &&
          val.every(item => oldVal.indexOf(item) > -1)) return;
        const checked = [];
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        val.forEach(item => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    },
    filterValue(val) {
      this.$refs["transferTree"].filter(val);
    }
  },
  computed: {
    filteredData() {
      return this.data.filter(item => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const label = item[this.labelProp] || item[this.keyProp].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }
      });
    },

    checkableData() {
      return this.filteredData.filter(item => !item[this.disabledProp]);
    },

    checkedSummary() {
      const checkedLength = this.checked.length;
      const checkedIdLength = this.checkedIds.length
      const dataLength = this.data.length;
      const count = this.getNodeCount(this.data)
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedIdLength}/${count}`;
      }
    },

    isIndeterminate() {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon() {
      return this.query.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search';
    },

    labelProp() {
      return this.props.label || 'label';
    },

    keyProp() {
      return this.props.key || 'key';
    },

    disabledProp() {
      return this.props.disabled || 'disabled';
    },

    hasFooter() {
      return !!this.$slots.default;
    },
    dataLength() {
      this.getNodeCount(this.data)
    }
  },

  methods: {
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
      this.allChecked = checkableDataKeys.length > 0 &&
        checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
    },

    handleAllCheckedChange(value) {
      this.checked = value
        ? this.checkableData.map(item => item[this.keyProp])
        : [];
      value ? this.$refs.transferTree.setCheckedNodes(this.data) : this.$refs.transferTree.setCheckedNodes([]);

    },

    clearQuery() {
      if (this.inputIcon === 'circle-close') {
        this.query = '';
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      if (checked) {
        this.checkedIds.push(data[this.nodeKey])
      } else {
        this.checkedIds = this.checkedIds.filter(item => item !== data[this.nodeKey])
      }
      console.log(this.$refs.transferTree.getCheckedKeys(), 'this.$refs.transferTree.getcheckedKeys()')
      this.checkedIds = this.$refs.transferTree.getCheckedKeys()
    },
    collapseAll() {
      // 获取 el-tree 实例
      const tree = this.$refs.transferTree;
      tree.store._getAllNodes().forEach(v => v.expanded = false)
    },
    // 在搜索框中监听关键字输入事件
    handleKeywordSearch(keyword) {
      // 清除之前的展开状态
      this.collapseAllNodes();

      // 递归遍历树节点，展开匹配的节点
      const tree = this.$refs.transferTree
      this.expandMatchingNodes(this.data, keyword, tree);
    },
    // 递归展开匹配的节点
    expandMatchingNodes(nodes, keyword, tree) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // 判断节点的文本是否包含关键字
        if (node[this.props.label].includes(keyword)) {
          // 展开匹配的节点
          tree.toggleRowExpansion(node, true);

          // 继续递归展开父节点
          this.expandParentNodes(node);
        } else {
          // 没有匹配关键字的节点折叠起来
          const elNode = tree.getNode(node);
          if (elNode) {
            this.$nextTick(() => {
              tree.collapseNode(elNode);
            });
          }

          // 递归处理子节点
          if (node.children && node.children.length > 0) {
            this.expandMatchingNodes(node.children, keyword);
          }
        }
      }
    },
    // 递归展开父节点
    expandParentNodes(node, tree) {
      const parentNode = tree.getNode(node.parent);

      if (parentNode) {
        tree.toggleRowExpansion(parentNode, true);
        this.expandParentNodes(parentNode);
      }
    },

    // 折叠所有的节点
    collapseAllNodes() {
      this.$refs.transferTree.store.defaultExpandedKeys = [];
    },
    // 源数据 筛选
    filterNodeMethod(value, data) {
      if (this.filterNode) {
        return this.filterNode(value, data, 'transferTree');
      }
      if (!value) return true;
      return data[this.props.label].indexOf(value) !== -1;
    },
    getNodeCount(nodes) {
      let count = 0;

      nodes.forEach(node => {
        count++; // 每遍历一个节点，总数加一

        if (node.children && node.children.length > 0) {
          count += this.getNodeCount(node.children); // 递归累加子节点的总数
        }
      });

      return count;
    }
  }
};
</script>
<style lang="scss">
.el-transfer-panel .el-transfer-panel__header {
  .el-checkbox {
    display: inline-block;
  }

  .select-label {
    margin-left: 6px;
    line-height: 40px;
    color: #1890FF;
    font-size: 16px;
    &.no-active {
      color:#AAAEB2;
    }
  }

  .select-sum-text {
    position: absolute;
    color:#AAAEB2;
    right: 6px;
  }
}
</style>
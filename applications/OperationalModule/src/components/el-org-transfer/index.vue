<template>
    <div class="el-org-transfer">
        <div class="el-org-input">
            <el-input ref="searchRef" prefix-icon="el-icon-search" v-bind="$props" v-model="inputVal"
                :placeholder="placeholder" @input="filterInputMethod" />
            <!-- <el-input prefix-icon="el-icon-search" v-bind="$props" v-model="inputVal" placeholder="请输入" /> -->
        </div>
        <div class="el-transfer">
            <transfer-panel v-bind="$props" ref="leftPanel" :data="sourceData"
                :title="titles[0] || t('el.transfer.titles.0')" :default-checked="leftDefaultChecked"
                :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
                @checked-change="onSourceCheckedChange" :filter-value="inputVal">
                <slot name="left-footer"></slot>
            </transfer-panel>
            <div class="el-transfer__buttons">
                <el-button type="primary" :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
                    @click.native="addToRight" :disabled="leftChecked.length === 0">
                    <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
                    <i class="el-icon-arrow-right"></i>
                </el-button>
                <el-button type="primary" :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
                    @click.native="addToLeft" :disabled="rightChecked.length === 0">
                    <i class="el-icon-arrow-left"></i>
                    <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
                </el-button>
                <slot name="btns"></slot>
            </div>
            <transfer-panel v-bind="$props" ref="rightPanel" :data="targetData"
                :title="titles[1] || t('el.transfer.titles.1')" :default-checked="rightDefaultChecked"
                :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
                @checked-change="onTargetCheckedChange" :filter-value="inputVal">
                <slot name="right-footer"></slot>
            </transfer-panel>
        </div>
    </div>
</template>

<script>
import ElInput from 'element-ui/packages/input';
import ElButton from 'element-ui/packages/button';
import Emitter from 'element-ui/src/mixins/emitter';
import Locale from 'element-ui/src/mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from 'element-ui/src/mixins/migrating';

export default {
    name: 'ElTransfer',

    mixins: [Emitter, Locale, Migrating],

    components: {
        TransferPanel,
        ElInput,
        ElButton
    },

    props: {
        data: {
            type: Array,
            default() {
                return [
                    {
                        id: 1,
                        label: 'Node 1',
                        children: [
                            {
                                id: 11,
                                label: 'Node 1-1',
                                children: []
                            },
                            {
                                id: 12,
                                label: 'Node 1-2',
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: 'Node 2',
                        children: []
                    }
                ];
            }
        },
        titles: {
            type: Array,
            default() {
                return [];
            }
        },
        buttonTexts: {
            type: Array,
            default() {
                return [];
            }
        },
        filterPlaceholder: {
            type: String,
            default: ''
        },
        filterMethod: Function,
        leftDefaultChecked: {
            type: Array,
            default() {
                return [];
            }
        },
        rightDefaultChecked: {
            type: Array,
            default() {
                return [];
            }
        },
        renderContent: Function,
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        format: {
            type: Object,
            default() {
                return {};
            }
        },
        filterable: Boolean,
        props: {
            type: Object,
            default() {
                return {
                    label: 'label',
                    key: 'key',
                    disabled: 'disabled'
                };
            }
        },
        targetOrder: {
            type: String,
            default: 'original'
        },
        nodeKey: String,
        placeholder: {
            type: String,
            default: '请选择'
        }
    },

    data() {
        return {
            leftChecked: [],
            rightChecked: [],
            inputVal: ''
        };
    },

    computed: {
        dataObj() {
            const key = this.props.key;
            return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
        },

        sourceData() {
            return this.data

            if (this.leftChecked.length) {
                return this.filterTreeDataNoExit(this.data, this.value || [])
            } else {
                return this.data
            }

        },

        targetData() {
            if (this.targetOrder === 'original') {
                console.log(this.value, 'targetData - this.value');
                return this.filterTreeData(this.data, this.value)
                // return this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1);
            } else {
                return []
                // 目标
                // return this.value.reduce((arr, cur) => {
                //     const val = this.dataObj[cur];
                //     if (val) {
                //         arr.push(val);
                //     }
                //     return arr;
                // }, []);
            }
        },

        hasButtonTexts() {
            return this.buttonTexts.length === 2;
        }
    },

    watch: {
        value(val) {
            this.dispatch('ElFormItem', 'el.form.change', val);
        }
    },

    methods: {
        getMigratingConfig() {
            return {
                props: {
                    'footer-format': 'footer-format is renamed to format.'
                }
            };
        },

        onSourceCheckedChange(val, movedKeys) {
            // this.$refs.transferTree.getCheckedKeys()
            this.leftChecked = Array.from(new Set(this.leftChecked.concat(val)));
            if (movedKeys === undefined) return;
            this.$emit('left-check-change', val, movedKeys);
        },

        onTargetCheckedChange(val, movedKeys) {
            this.rightChecked = val;
            if (movedKeys === undefined) return;
            this.$emit('right-check-change', val, movedKeys);
        },

        addToLeft() {
            let currentValue = this.value.slice();
            const rightCheckeds = this.$refs.rightPanel.$refs.transferTree.getCheckedKeys(this.props.isLeaf || false)
            rightCheckeds.forEach(item => {
                const index = currentValue.indexOf(item);
                if (index > -1) {
                    currentValue.splice(index, 1);
                }
            });
            this.$emit('input', currentValue);
            this.$emit('change', currentValue, 'left', this.rightChecked);
            this.setCheckedKeys(this.value)
        },

        addToRight() {
            // this.filterTreeData()
            let currentValue = this.value.slice();
            // const itemsToBeMoved = [];
            // const key = this.props.key;
            // this.data.forEach(item => {
            //     const itemKey = item[key];
            //     if (
            //         this.leftChecked.indexOf(itemKey) > -1 &&
            //         this.value.indexOf(itemKey) === -1
            //     ) {
            //         itemsToBeMoved.push(itemKey);
            //     }
            // });
            // currentValue = this.targetOrder === 'unshift'
            //     ? itemsToBeMoved.concat(currentValue)
            //     : currentValue.concat(itemsToBeMoved);
            //     alert(currentValue)
            const leftCheckeds = this.$refs.leftPanel.$refs.transferTree.getCheckedKeys(this.props.isLeaf || false)
            console.log(this.$refs.leftPanel.$refs.transferTree, leftCheckeds, 'leftCheckedsleftCheckedsleftCheckedsleftCheckedsleftCheckeds');
            currentValue = leftCheckeds
            this.$emit('input', currentValue);
            this.$emit('change', currentValue, 'right', this.leftChecked);
            this.setCheckedKeys(this.value)
        },

        clearQuery(which) {
            if (which === 'left') {
                this.$refs.leftPanel.query = '';
            } else if (which === 'right') {
                this.$refs.rightPanel.query = '';
            }
        },

        filterTreeData(treeData, targetIds) {
            const nodeList = []
            for (let i = 0; i < treeData.length; i++) {
                const node = treeData[i];
                if (targetIds.includes(node.id)) {
                    nodeList.push(node)
                } else if (node.children && node.children.length > 0) {
                    const filteredChildren = this.filterTreeData(node.children, targetIds);
                    if (filteredChildren.length > 0) {
                        return [{ ...node, children: filteredChildren }];
                    }
                }
            }
            return nodeList.length ? nodeList : [];
        },
        filterTreeDataNoExit(treeData, targetIds) {
            const nodeList = []
            for (let i = 0; i < treeData.length; i++) {
                const node = treeData[i];
                if (!targetIds.includes(node.id)) {
                    nodeList.push(node)
                } else if (node.children && node.children.length > 0) {
                    const filteredChildren = this.filterTreeData(node.children, targetIds);
                    if (filteredChildren.length > 0) {
                        return [{ ...node, children: filteredChildren }];
                    }
                }
            }
            return nodeList.length ? nodeList : [];
        },
        setCheckedKeys() {
            // this.$nextTick(() => {
            //     this.$refs.rightPanel.$refs.transferTree.setCheckedKeys(this.value);
            // })
        },
        filterInputMethod(val) {
            console.log(val, 'val')
            // this.handleKeywordSearch(val)
        }
    }
};
</script>
<style lang="scss">
.el-transfer__buttons {
    .el-button+.el-button {
        display: block;
        margin-left: 0;
    }
}
</style>
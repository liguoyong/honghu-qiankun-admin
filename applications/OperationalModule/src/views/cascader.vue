<template>
  <div style="width: 516px;">
    <org-transfer ref="transferRef" :props="propsOptions" :titles="['全部收起', '全部收起']" :value="value" @input="changeVal"
      :default-checked-keys="[]" placeholder="请输入组织名称进行查询" node-key="id" :data="orgData" clearable />
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>
  
<script>
import OrgTransfer from '../components/el-org-transfer/index.vue'
export default {
  components: {
    OrgTransfer
  },
  data() {
    return {
      propsOptions: {
        label: 'realName',
        children: 'children'
      },
      value: [],
      orgData: [{
        realName: '移动',
        id: '1',
        children: [{
          realName: '广东',
          id: '2',
          children: [{
            realName: '深圳',
            id: '3'
          }, {
            realName: '深圳1',
            id: '4'
          }]
        }]
      }, {
        realName: '移动2',
        id: '11',
        children: [{
          realName: '广东2',
          id: '21',
          children: [{
            realName: '深圳2',
            id: '31'
          }]
        }]
      }]
    }
  },
  methods: {
    changeVal(val) {
      console.log('val', val);
      this.value = val
    },
    handleSubmit() {
      console.log(this.value, this.$refs.transferRef, 'this.$refs.transferRef');
    }
  }
}
</script>
  
<style></style>
  
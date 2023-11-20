<template>
  <div style="width: 582px;">
    <org-transfer :props="propsOptions" :value="value" @input="changeVal" :default-checked-keys="[]" node-key="id"
      :data="orgData" clearable />
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
    }
  }
}
</script>
  
<style></style>
  
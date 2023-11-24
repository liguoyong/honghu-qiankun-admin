<template>
  <div style="width: 516px;">
    <org-transfer ref="transferRef" :props="propsOptions" emptyText="" :titles="['全部收起', '全部收起']" v-model="value"
      @input="changeVal" :leftDefaultChecked="value" placeholder="请输入组织名称进行查询" node-key="id" :data="orgData" clearable>
      <template v-slot:empty>
        <div class="nodata">
          <img src="../assets/notreedata.png" alt="" srcset="">
          <span>暂无选中项</span>
        </div>
      </template>
    </org-transfer>
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>
  
<script>
import OrgTransfer from '../components/el-org-transfer/index.vue'
const org = require('./org.json')
export default {
  components: {
    OrgTransfer
  },
  data() {
    return {
      propsOptions: {
        label: 'orgName',
        children: 'children',
        // isLeaf: true
      },
      value: [1945],
      orgData: org,
      defaultCheckedKeys: []
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
  
<template>
  <div style="height: 100vh">
    <div class="block" style="height: 100vh">
      <div class="error_title">
        出错啦o(╥﹏╥)o 
        <br />您暂无该页面的访问权限，请联系管理员进行授权吧O(∩_∩)O~
      </div>
      <el-button type="primary" round class="btu" @click="Backoff">返 回</el-button>
    </div>
  </div>
</template>

<script>
import img from '@/assets/404_images/401背景@3x.png';
export default {
  name: 'error404',
  methods:{
    Backoff(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>
.block {
  background-image: url('../../assets/404_images/401背景@3x.png');
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
  text-align: center;
}
.error_title {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #3E4576;
  letter-spacing: 0;
  text-align: center;
  line-height: 40px;
  padding-top: 15%;
  font-weight: 600;
  margin-bottom: 30px;
}
.btu{
  width: 200px;
}
</style>
<template>
  <div class="error404-box">
    <div class="content">
      <svg-icon style=" width: 230px; height: 200px;" class="icon-content" icon-class="404"></svg-icon>
      <p>抱歉！您访问的页面不存在，请刷新重试~</p>
    </div>
    <!-- <div class="block" style="height: 100vh">
      <div class="error_title">
        出错啦o(╥﹏╥)o 
        <br />没有找到你要访问的页面，请点击下面按钮返回上一个页面吧O(∩_∩)O~
      </div>
      <el-button type="primary" round class="btu" @click="Backoff">返 回</el-button>
    </div> -->

  </div>
</template>

<script>
import { getUrlKey }  from '@/utils/common'
export default {
  name: 'error404',
  methods:{
    Backoff(){
      //如果是参数错误就向上返回两级，不然就返回一级，
      if( getUrlKey('error',window.location.href))
      this.$router.go(-2)
      else
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="scss" scoped>
.error404-box {
  height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 230px;
  text-align: center;
  p {
    width: 220px;
    color: #8B8F92;
    line-height: 28px;
  }
}
.icon-content {
  display: inline-block;
  width: 230px;
  height: 200px;
}
/* .block {
  background-image: url('../../assets/404_images/404背景@3x.png');
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
} */
</style>
<template>
  <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(route, index) in routes" :key="index">
      <span @click="handleBreadcrumbClick(index)">{{ route.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  computed: {
    routes() {
      const uniqueArr = [];
      const temp = {};
      this.$route.matched.forEach(obj => {
        if (!temp[obj.meta.title]) {
          temp[obj.meta.title] = true;
          uniqueArr.push(obj);
        }
      });
      return uniqueArr.filter(route => route.meta && route.meta.title);
    }
  },
  methods: {
    handleBreadcrumbClick(index) {
      this.$router.push(this.routes[index].path);
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb-container {

  :deep(.el-breadcrumb__inner),
  :deep(.el-breadcrumb__separator) {
    color: #fff;
  }

  :deep(.el-breadcrumb__item) {
    cursor: pointer;

    &:last-child {
      
      .el-breadcrumb__inner,
      .el-breadcrumb__inner:hover,
      .el-breadcrumb__inner a,
      .el-breadcrumb__inner a:hover {
        color: #fff;
        font-weight: bold;
      }
    }
  }

}
</style>
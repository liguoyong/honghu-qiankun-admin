<template>
    <el-sub-menu :index="item.id + ''" v-for="item in menu" :key="item.path">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item :index="(item.path === '/' ? '' : item.path) + '/' + subItem.path" v-for="subItem in item.children"
        :key="subItem.id">
        <el-icon><icon-menu /></el-icon>
        {{ subItem.meta.title }}
      </el-menu-item>
    </el-sub-menu>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["menu", "parent"],
  data() {
    return {};
  },
  created() {
    console.log(this.menu, 'menu');
  },
  methods: {
    getIndex(item) {
      const parent = this.parent
      const path = item.path && item.path.indexOf(':') === 0 ? '' : item.path
      const index = (parent && parent != '/') ? parent + '/' + path : path
      console.log(parent, 'parent', 'path', path, 'index', index);
      return index
    }
  }
};
</script>

<style>
</style>

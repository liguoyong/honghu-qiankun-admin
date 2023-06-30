<template>
  <div class="menu-wrapper">
    <template v-for="item in menu">
      <!-- 最后一级菜单 -->
      <el-menu-item v-if="!item.children && !item.hidden" :key="item.path" :index="getIndex(item)">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="item.children && !item.hidden" :key="item.path"
        :index="parent ? parent + '/' + item.path : item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span> {{ item.meta.title }}</span>
        </template>
        <!-- 递归 -->
        <sidebar-item :menu="item.children" :parent="getIndex(item)" />
      </el-submenu>
    </template>
  </div>
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

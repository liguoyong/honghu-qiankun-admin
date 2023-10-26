<template>
  <transition>
    <router-view></router-view>
  </transition>
</template>

<script>
import NProgress from "nprogress";
import microApps from "./micro-app";
import { useUsersStore } from "./store/user";
import { useAppStore } from "./store/app.js"
import store from "@/store.js";
export default {
  name: "App",
  data() {
    return {
      isFirst: true,
      isLoading: true,
      microApps,
      current: "/vue/",
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    const user = useUsersStore();
    const app = useAppStore()
    console.log(user, app, "storestore");
    setTimeout(() => {
      store.setGlobalState({
        ignore: '***********main',
        user: {
          name: '**********main',
        },
      });
    }, 4000);
  },
  methods: {
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    bindCurrent() {
      const path = window.location.pathname;
      console.info("xxxxxxxx");
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },

  },


};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

.layout-wrapper {
  width: 100%;
}
</style>

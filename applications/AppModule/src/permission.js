import router from "./router";
import { useUsersStore } from "@/store/user.js";

import { ElMessage } from "element-plus";

import { getToken } from "@/utils/auth"; // get token from cookie


const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            try {
                const userStore = useUsersStore();
                if (!userStore.userId) {
                    await userStore.GET_USER_INFO();
                }
                next();
            } catch (error) {
                next(`/login?redirect=${to.path}`);
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});

router.afterEach(() => {
});

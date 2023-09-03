import { http } from "@/utils/http";

/** 创建计划 */
export const createPlan = async (data?: object) => {
    return await http.request("post", "/api/plan/create", { data });
};

/** 编辑计划 */
export const updatePlan = async (data?: object) => {
    return await http.request("post", "/api/plan/update", { data });
};

/** 查看计划详情 */
export const getPlanDetail = async (data?: object) => {
    return await http.request("post", "/api/plan/detail", { data });
};

// 删除计划
export const getDeletePlan = async (data?: object) => {
    return await http.request("post", "/api/plan/delete", { data });
};


// 获取计划列表
export const getPlansList = async (data?: object) => {
    return await http.request("post", "/api/plan/list", { data });
}

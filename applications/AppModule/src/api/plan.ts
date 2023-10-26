import { http } from "@/utils/http";

import { ResponseType } from './types'
/** 创建计划 */
export const createPlan = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/plan/create", { data });
};

/** 编辑计划 */
export const updatePlan = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/plan/update", { data });
};

/** 查看计划详情 */
export const getPlanDetail = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/plan/detail", { data });
};

// 删除计划
export const getDeletePlan = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/plan/delete", { data });
};


// 获取计划列表
export const getPlansList = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/plan/list", { data });
}

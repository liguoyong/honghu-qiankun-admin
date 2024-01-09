import { http } from "@/utils/http";

import { ResponseType } from './types'
/** 创建计划 */
export const createTodo = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/todo/create", { data });
};

/** 编辑计划 */
export const updateTodo = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/todo/update", { data });
};

/** 查看计划详情 */
export const getTodoDetail = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/todo/detail", { data });
};

// 删除计划
export const getDeleteTodo = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/todo/delete", { data });
};


// 获取计划列表
export const getTodoList = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/todo/list", { data });
}

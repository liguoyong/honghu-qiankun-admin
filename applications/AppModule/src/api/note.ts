import { http } from "@/utils/http";
import { ResponseType } from './types'
/** 创建笔记 */
export const createNote = async  <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/note/create", { data });
};

/** 编辑笔记 */
export const updateNote = async  <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/note/update", { data });
};

/** 查看笔记详情 */
export const getNoteDetail = async  <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/note/detail", { data });
};

// 删除笔记
export const getDeleteNote = async  <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/note/delete", { data });
};


// 获取笔记列表
export const getNotesList = async <R = ResponseType>(data?: object) => {
    return await http.request<R>("post", "/api/note/list", { data });
}

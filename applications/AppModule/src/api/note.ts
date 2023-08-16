import { http } from "@/utils/http";

/** 创建笔记 */
export const createNote = async (data?: object) => {
    return await http.request("post", "/api/note/create", { data });
};

// 获取笔记列表
export const getNotesList = async (data?: object) => {
    return await http.request("post", "/api/note/list", { data });
}

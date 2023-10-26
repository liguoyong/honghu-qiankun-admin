import { http } from "@/utils/http";
// 更新用户信息
export const uploadFile = async (data?: object, config) => {
    return await http.request("post", "/api/uploadFile", { data }, config);
  };
  
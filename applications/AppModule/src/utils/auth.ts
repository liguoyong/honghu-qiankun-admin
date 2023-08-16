import Cookies from "js-cookie";
import storageSession from './storage.ts';
export interface DataInfo<T> {
    /** token */
    accessToken: string;
    /** `accessToken`的过期时间（时间戳） */
    expire: T;
    /** 用于调用刷新accessToken的接口时所需的token */
    refreshToken: string;
    /** 用户名 */
    username?: string;
    /** 当前登陆用户的角色 */
    roles?: Array<string>;
}

export const sessionKey = "user-info";
export const TokenKey = "Authorization";

/** 获取`token` */
export function getToken(): DataInfo<number> {
    // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
    return Cookies.get(TokenKey)
        ? JSON.parse(Cookies.get(TokenKey))
        : storageSession.getItem(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expire`（`accessToken`的过期时间）
 * 将`accessToken`、`expire`这两条信息放在key值为Authorization的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expire`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
    let expire = 0;
    const { accessToken, refreshToken } = data;
    expire = new Date(data.expire).getTime(); // 如果后端直接设置时间戳，将此处代码改为expire = data.expire，然后把上面的DataInfo<Date>改成DataInfo<number>即可
    const cookieString = JSON.stringify({ accessToken, expire });
    expire > 0
        ? Cookies.set(TokenKey, cookieString, {
            expires: new Date(expire + Date.now())
        })
        : Cookies.set(TokenKey, cookieString);
    function setSessionKey(username: string, roles: Array<string>) {
        const userInfo = {
            refreshToken,
            expire,
            username,
            roles
        }
        storageSession.setItem(sessionKey, JSON.stringify(userInfo));
    }

    if (data.username && data.roles) {
        const { username, roles } = data;
        setSessionKey(username, roles);
    } else {
        const username =
            storageSession.getItem(sessionKey)?.username ?? "";
        const roles =
            storageSession.getItem(sessionKey)?.roles ?? [];
        setSessionKey(username, roles);
    }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
    Cookies.remove(TokenKey);
    storageSession.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
    return "Bearer " + token;
};

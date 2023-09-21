import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CustomParamsSerializer
} from "axios";
import {
  ResponseType,
  AdminHttpError,
  RequestMethods,
  AdminHttpResponse,
  AdminHttpRequestConfig
} from "./types.d";
import { stringify } from "qs";
import NProgress from "../progress";
import { getToken, formatToken } from "@/utils/auth";

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

class AdminHttp {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** token过期后，暂存待执行的请求 */
  private static requests = [];

  /** 防止重复刷新token */
  private static isRefreshing = false;

  /** 初始化配置对象 */
  private static initConfig: AdminHttpRequestConfig = {};

  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 重连原始请求 */
  private static retryOriginalRequest(config: AdminHttpRequestConfig) {
    return new Promise(resolve => {
      AdminHttp.requests.push((token: string) => {
        console.log('token', token, formatToken(token))
        config.headers["Authorization"] = formatToken(token);
        resolve(config);
      });
    });
  }

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    AdminHttp.axiosInstance.interceptors.request.use(
      async (config: AdminHttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        NProgress.start();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (AdminHttp.initConfig.beforeRequestCallback) {
          AdminHttp.initConfig.beforeRequestCallback(config);
          return config;
        }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ["/refreshToken", "/api/user/login"];
        console.log(config, 'configconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfigconfig');

        return whiteList.find(url => url === config.url)
          ? config
          : new Promise(resolve => {
            const data = getToken();
            console.log(data, 'datadatadatadatadatadatadatadatadatadatadatadata');

            if (data) {
              config.headers["Authorization"] = formatToken(
                data.accessToken
              );
              resolve(config);
              // const now = new Date().getTime();
              // const expired = parseInt(data.expire) - now <= 0;
              // if (expired) {
              //   resolve(AdminHttp.retryOriginalRequest(config));
              // } else {
              //   config.headers["Authorization"] = formatToken(
              //     data.accessToken
              //   );
              //   resolve(config);
              // }
            } else {
              resolve(config);
            }
          });
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = AdminHttp.axiosInstance;
    instance.interceptors.response.use(
      (response: AdminHttpResponse) => {
        const $config = response.config;
        // 关闭进度条动画
        NProgress.done();
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (AdminHttp.initConfig.beforeResponseCallback) {
          AdminHttp.initConfig.beforeResponseCallback(response);
          return response.data;
        }
        return response.data;
      },
      (error: AdminHttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 关闭进度条动画
        NProgress.done();
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AdminHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as AdminHttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      AdminHttp.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T = any, P = ResponseType>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: AdminHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, params, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: AdminHttpRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, params, config);
  }
}

export const http = new AdminHttp();

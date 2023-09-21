import Axios, {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface ResponseType {
  code: number
  data: any
  msg: string
}

export interface AdminHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface AdminHttpResponse extends AxiosResponse {
  config: AdminHttpRequestConfig;
}

export interface AdminHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: AdminHttpRequestConfig) => void;
  beforeResponseCallback?: (response: AdminHttpResponse) => void;
}

export default class AdminHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: AdminHttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: T,
    config?: AdminHttpRequestConfig
  ): Promise<P>;
  get<T, P>(
    url: string,
    params?: T,
    config?: AdminHttpRequestConfig
  ): Promise<P>;
}

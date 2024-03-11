import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
// @ts-ignore
import { AxiosResponse } from 'axios';
import qs from 'qs';
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
/*interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}*/

interface Result<T> {
  code: number;
  msg: string;
  data: T;
  desc: string;
}
const FORM_URL_ENCODED_TYPE: string = 'application/x-www-form-urlencoded';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
  baseURL: '/api',
  withCredentials: true,
  // 错误处理： umi@3 的错误处理方案。
  headers: { 'Content-Type': 'application/json' },
  /*errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      console.log('errorThrower', res);
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.log('errorHandler');
      console.log(error);
      console.log(opts);
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },*/

  // 请求拦截器
  requestInterceptors: [
    [
      (config: RequestConfig) => {
        // 拦截请求配置，进行个性化处理。
        const params = config?.params || {};
        const data = config?.data || {};
        const headers = config?.headers || {};
        const method = config?.method?.toUpperCase();
        if (method === 'POST' && headers['Content-Type'] === FORM_URL_ENCODED_TYPE) {
          config.data = qs.stringify(data);
        }
        if (method === 'GET' && params) {
          config.params = {};
          const paramsStr = qs.stringify(params, { allowDots: true });
          if (paramsStr) {
            config.url = config.url + '?' + paramsStr;
          }
        }
        return config;
      },
    ],
  ],

  // 响应拦截器
  responseInterceptors: [
    /*    [
      (response: AxiosResponse<Result<any>>) => {
        // 拦截响应数据，进行个性化处理
        console.log('response', response);
        const { data } = response; //  as unknown as ResponseStructure
        console.log(data);
        if (!data || data?.code !== 0) {
          message.error('请求失败！');
        }
        return data;
      },
      (err: any) => {
        console.log(err);
      },
    ],*/
    // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    [
      (response: AxiosResponse<Result<any>>) => {
        if (!response?.data) {
          throw new Error('request error');
        }
        const responseType = response?.request?.responseType;
        if (responseType === 'blob' || responseType === 'arraybuffer') {
          if (response.data.type !== 'application/json') {
            return response.data;
          }
          return response;
        }
        const { code, msg, desc } = response.data;
        if (code !== 0) {
          console.log('response error');
          if (msg) {
            if (desc) {
              message.error(`${msg},${desc}`);
            } else {
              message.error(msg);
            }
          } else {
            message.error('系统未知错误，请您联系管理员!');
          }
          return Promise.reject(msg);
        } else {
          return response.data;
        }
      },
      (error: any) => {
        console.log('error', error);
        return Promise.reject(error);
      },
    ],
  ],
};

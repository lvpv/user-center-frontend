import { request } from '@umijs/max';
// @ts-ignore
import { AxiosRequestConfig } from 'axios';

export async function authLogin(data: AUTH.LoginRequest, options: AxiosRequestConfig<any> = {}) {
  return request<AUTH.UserResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}

export async function getUserInfo(options?: { [key: string]: any }) {
  return request<AUTH.UserResponse>('/auth/info', {
    method: 'GET',
    ...(options || {}),
  });
}

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

export async function authRegister(
  data: AUTH.RegisterRequest,
  options: AxiosRequestConfig<any> = {},
) {
  return request<number>('/auth/register', {
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

export async function authLogout(options?: { [key: string]: any }) {
  return request<AUTH.UserResponse>('/auth/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

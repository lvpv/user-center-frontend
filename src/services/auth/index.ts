import { request } from '@umijs/max';
// @ts-ignore
import { AxiosRequestConfig } from 'axios';

export async function authLogin(data: AUTH.LoginRequest) {
  return request<AUTH.UserResponse>('/auth/login', { method: 'POST', data });
}

export async function authRegister(data: AUTH.RegisterRequest) {
  return request<number>('/auth/register', { method: 'POST', data });
}

export async function getUserInfo(options: AxiosRequestConfig<any>) {
  return request<AUTH.UserResponse>('/auth/info', { method: 'GET', ...(options || {}) });
}

export async function authLogout() {
  return request<AUTH.UserResponse>('/auth/logout', { method: 'GET' });
}

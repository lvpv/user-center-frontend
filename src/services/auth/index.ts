import { request } from '@umijs/max';
// @ts-ignore
import { AxiosRequestConfig } from 'axios';

export async function authLogin(data: AUTH.LoginRequest) {
  return request<AUTH.UserResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
}

export async function authRegister(data: AUTH.RegisterRequest) {
  return request<number>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
}

export async function getUserInfo(options: AxiosRequestConfig<any>) {
  return request<AUTH.UserResponse>('/auth/info', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    ...(options || {}),
  });
}

export async function authLogout() {
  return request<AUTH.UserResponse>('/auth/logout', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  });
}

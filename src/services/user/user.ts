import { request } from '@umijs/max';

export async function searchUser(params?: { username: string }) {
  return request<AUTH.UserResponse[]>('/user/search', { method: 'GET', params });
}

export async function deleteUser(id: number) {
  return request<void>(`/user/delete/${id}`, { method: 'DELETE', skipErrorHandler: true });
}

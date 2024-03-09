import { request } from '@umijs/max';

export async function searchUser(username?: string) {
  let url = '/user/search';
  if (username) {
    url = `/user/search?username=${username}`;
  }
  return request<AUTH.UserResponse[]>(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function deleteUser(id: number) {
  return request<void>(`/user/delete/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
}

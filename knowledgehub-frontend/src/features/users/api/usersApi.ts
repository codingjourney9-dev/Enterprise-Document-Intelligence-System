import { apiClient } from "../../../shared/api/apiClient";
import type { CreateUserRequest, UpdateUserRoleRequest, User } from "../types";

export async function getUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>("/users");
  return data;
}

export async function createUser(payload: CreateUserRequest): Promise<User> {
  const { data } = await apiClient.post<User>("/users", payload);
  return data;
}

export async function updateUserRole(
  id: string,
  payload: UpdateUserRoleRequest,
): Promise<User> {
  const { data } = await apiClient.put<User>(`/users/${id}/role`, null, {
    params: { role: payload.role },
  });
  return data;
}

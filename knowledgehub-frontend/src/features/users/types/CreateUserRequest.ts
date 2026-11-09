import type { UserRole } from "./User";

export interface CreateUserRequest {
  name: string;
  role: UserRole;
}

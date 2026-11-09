export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

import { useCallback, useEffect, useState } from "react";

import { CreateUserForm } from "../components/CreateUserForm";
import { UsersTable } from "../components/UsersTable";
import { getUsers } from "../api/usersApi";
import type { User } from "../types";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshUsers();
  }, [refreshUsers]);

  if (isLoading) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">Loading users...</div>;
  }

  if (error) {
    return <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-sm font-medium text-rose-700">{error}</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Users</h1>
        <p className="mt-1 text-sm text-slate-600">Create users and manage role assignments.</p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No users found.
        </div>
      ) : null}

      <UsersTable users={users} onUsersChanged={refreshUsers} />

      <CreateUserForm onUserCreated={refreshUsers} />
    </section>
  );
}

import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { updateUserRole } from "../api/usersApi";
import type { User } from "../types";

interface UsersTableProps {
  users: User[];
  onUsersChanged: () => Promise<void>;
}

function getNextRole(currentRole: User["role"]): User["role"] {
  return currentRole === "ADMIN" ? "USER" : "ADMIN";
}

export function UsersTable({ users, onUsersChanged }: UsersTableProps) {
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChangeRole = async (user: User) => {
    setUpdatingUserId(user.id);
    setError(null);

    try {
      await updateUserRole(user.id, { role: getNextRole(user.role) });
      await onUsersChanged();
    } catch (err) {
      console.error(err);
      setError("Failed to update user role.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <section className="space-y-3">
      {error ? <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100/80">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <span
                      className={
                        user.role === "ADMIN"
                          ? "inline-flex items-center rounded-full border border-indigo-300 bg-indigo-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-700"
                          : "inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleChangeRole(user)}
                      disabled={updatingUserId === user.id}
                      className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <RefreshCw size={14} aria-hidden="true" />
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

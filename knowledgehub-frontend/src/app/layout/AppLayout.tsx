import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import { setRequestRole } from "../../shared/api/requestRole";
import type { UserRole } from "../../features/users/types";

export function AppLayout({ children }: PropsWithChildren) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("ADMIN");

  useEffect(() => {
    setRequestRole(selectedRole);
  }, [selectedRole]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="mr-2 text-lg font-semibold tracking-tight text-slate-900">Knowledge Hub</h1>
          <NavLink
            to="/documents"
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            Documents
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            Users
          </NavLink>
          <label className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-slate-700">
            Role
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value as UserRole)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm outline-none ring-slate-300 transition focus:border-slate-400 focus:ring-2"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </label>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

import { useState } from "react";

import { createUser } from "../api/usersApi";
import type { UserRole } from "../types";

interface CreateUserFormProps {
  onUserCreated: () => Promise<void>;
}

export function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("USER");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createUser({
        name: name.trim(),
        role,
      });
      setName("");
      setRole("USER");
      await onUserCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">Create User</h2>
        <p className="mt-1 text-sm text-slate-600">Add a new user and assign an initial role.</p>
      </div>
      {error ? <p className="mt-3 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p> : null}
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label htmlFor="create-user-name" className="text-sm font-medium text-slate-700 sm:col-span-2">Name</label>
          <input
            id="create-user-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter user name"
            className="sm:col-span-2 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-300 transition focus:border-slate-400 focus:ring-2"
          />

          <label htmlFor="create-user-role" className="text-sm font-medium text-slate-700">Role</label>
          <select
            id="create-user-role"
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-slate-300 transition focus:border-slate-400 focus:ring-2"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="sm:col-span-2 mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </section>
  );
}

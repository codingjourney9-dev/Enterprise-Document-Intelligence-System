import { useSyncExternalStore } from "react";

export type RequestRole = "ADMIN" | "USER";

let currentRequestRole: RequestRole = "ADMIN";
const listeners = new Set<() => void>();

export function getRequestRole(): RequestRole {
  return currentRequestRole;
}

export function setRequestRole(role: RequestRole): void {
  if (currentRequestRole === role) {
    return;
  }

  currentRequestRole = role;

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useRequestRole(): RequestRole {
  return useSyncExternalStore(subscribe, getRequestRole, getRequestRole);
}

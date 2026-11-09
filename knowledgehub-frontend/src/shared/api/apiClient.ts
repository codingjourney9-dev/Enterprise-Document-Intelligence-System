import axios from "axios";
import { getRequestRole } from "./requestRole";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const selectedRole = getRequestRole();
  const { params } = config;

  if (params instanceof URLSearchParams) {
    if (!params.has("role")) {
      params.set("role", selectedRole);
    }

    config.params = params;
    return config;
  }

  const paramsObject = (params as Record<string, unknown> | undefined) ?? {};

  config.params = {
    ...paramsObject,
    role: paramsObject.role ?? selectedRole,
  };

  return config;
});

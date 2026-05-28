import { useAuthStore } from "../store/authStore";
import type { ApiError } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

export class ApiClientError extends Error {
  status: number;
  details?: Record<string, string>;
  constructor(message: string, status: number, details?: Record<string, string>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/**
 * Single fetch wrapper used by all feature modules. Attaches the JWT from the
 * auth store, normalises errors into `ApiClientError`, and parses JSON.
 */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.body ? { "Content-Type": "application/json" } : {}),
    ...((init.headers as Record<string, string>) ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers });
  const text = await res.text();
  const json = text ? (JSON.parse(text) as unknown) : undefined;

  if (!res.ok) {
    const err = (json as ApiError | undefined) ?? { error: res.statusText };
    throw new ApiClientError(err.error || "Request failed", res.status, err.details);
  }
  return json as T;
}

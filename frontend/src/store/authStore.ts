import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  setSession: (user: User, token: string) => void;
  logout: () => void;
}

/**
 * Auth session — persisted to localStorage so a page reload doesn't sign the
 * user out. The token is also sent as a Bearer header by the API client; the
 * backend re-validates on every request (no client-side trust).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setSession: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: "notevault-auth" },
  ),
);

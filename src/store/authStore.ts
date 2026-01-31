import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, LoginCredentials } from "@/types/auth";

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        // Mock authentication - in real app, this would call an API
        if (credentials.email && credentials.password) {
          const user: AuthUser = {
            email: credentials.email,
            name: "Adedeji",
            avatar: "/avatar.jpg",
          };

          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user: AuthUser) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "lendsqr-auth-storage",
    }
  )
);

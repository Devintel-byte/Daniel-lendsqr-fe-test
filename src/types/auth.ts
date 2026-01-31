export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

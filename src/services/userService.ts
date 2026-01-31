import { api } from "./api";
import type {
  User,
  UserFilters,
  UserStatus,
  PaginationMeta,
} from "@/types/user";

interface UsersResponse {
  data: User[];
  meta: PaginationMeta;
}

interface UserResponse {
  data: User;
}

interface UpdateStatusResponse {
  data: User;
  message: string;
}

export const userService = {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    filters?: UserFilters,
    search?: string
  ): Promise<UsersResponse> {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (search) params.search = search;
    if (filters?.organization) params.organization = filters.organization;
    if (filters?.username) params.username = filters.username;
    if (filters?.email) params.email = filters.email;
    if (filters?.phoneNumber) params.phoneNumber = filters.phoneNumber;
    if (filters?.status) params.status = filters.status;
    if (filters?.date) params.date = filters.date;

    return api.get<UsersResponse>("/users", params);
  },

  async getUserById(id: string): Promise<UserResponse> {
    return api.get<UserResponse>(`/users/${id}`);
  },

  async updateUserStatus(
    id: string,
    status: UserStatus
  ): Promise<UpdateStatusResponse> {
    return api.patch<UpdateStatusResponse>(`/users/${id}/status`, { status });
  },
};

import { api } from "./api";
import type { DashboardStats } from "@/types/dashboard";

interface StatsResponse {
  data: DashboardStats;
}

interface OrganizationsResponse {
  data: string[];
}

export const dashboardService = {
  async getStats(): Promise<StatsResponse> {
    return api.get<StatsResponse>("/dashboard/stats");
  },

  async getOrganizations(): Promise<OrganizationsResponse> {
    return api.get<OrganizationsResponse>("/organizations");
  },
};

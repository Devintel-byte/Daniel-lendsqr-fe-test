import { http, HttpResponse } from "msw";
import { generateMockUsers } from "./data";
import type { User, UserFilters, UserStatus } from "@/types/user";
import type { DashboardStats } from "@/types/dashboard";

const mockUsers = generateMockUsers(100);

function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter((user) => {
    if (filters.organization && user.organization !== filters.organization)
      return false;
    if (
      filters.username &&
      !user.username.toLowerCase().includes(filters.username.toLowerCase())
    )
      return false;
    if (
      filters.email &&
      !user.email.toLowerCase().includes(filters.email.toLowerCase())
    )
      return false;
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber))
      return false;
    if (filters.status && user.status !== filters.status) return false;
    if (filters.date) {
      const userDate = new Date(user.dateJoined).toDateString();
      const filterDate = new Date(filters.date).toDateString();
      if (userDate !== filterDate) return false;
    }
    return true;
  });
}

export const handlers = [
  // Get all users with pagination and filtering
  http.get("/api/users", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";

    const filters: UserFilters = {
      organization: url.searchParams.get("organization") || undefined,
      username: url.searchParams.get("username") || undefined,
      email: url.searchParams.get("email") || undefined,
      phoneNumber: url.searchParams.get("phoneNumber") || undefined,
      status: (url.searchParams.get("status") as UserStatus) || undefined,
      date: url.searchParams.get("date") || undefined,
    };

    let filteredUsers = filterUsers(mockUsers, filters);

    // Apply global search
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.organization.toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return HttpResponse.json({
      data: paginatedUsers,
      meta: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalRecords: filteredUsers.length,
        recordsPerPage: limit,
      },
    });
  }),

  // Get single user by ID
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    return HttpResponse.json({ data: user });
  }),

  // Update user status
  http.patch("/api/users/:id/status", async ({ params, request }) => {
    const { id } = params;
    const { status } = (await request.json()) as { status: UserStatus };

    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    mockUsers[userIndex].status = status;

    return HttpResponse.json({
      data: mockUsers[userIndex],
      message: "User status updated successfully",
    });
  }),

  // Get dashboard statistics
  http.get("/api/dashboard/stats", () => {
    const stats: DashboardStats = {
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter((u) => u.status === "Active").length,
      usersWithLoans: mockUsers.filter(
        (u) => parseInt(u.loanRepayment.replace(/,/g, "")) > 0
      ).length,
      usersWithSavings: mockUsers.filter(
        (u) => parseFloat(u.accountBalance.replace(/[₦,]/g, "")) > 100000
      ).length,
    };

    return HttpResponse.json({ data: stats });
  }),

  // Get organizations list
  http.get("/api/organizations", () => {
    const organizations = Array.from(
      new Set(mockUsers.map((u) => u.organization))
    );
    return HttpResponse.json({ data: organizations });
  }),

  // Login endpoint
  http.post("/api/auth/login", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    // Mock authentication - accept any non-empty credentials
    if (email && password) {
      return HttpResponse.json({
        data: {
          user: {
            email,
            name: "Adedeji",
            avatar: "/avatar.jpg",
          },
          token: "mock-jwt-token",
        },
      });
    }

    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),
];

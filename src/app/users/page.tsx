"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { userService } from "@/services/userService";
import { dashboardService } from "@/services/dashboardService";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { StatCard } from "@/components/StatCard/StatCard";
import { Pagination } from "@/components/Pagination/Pagination";
import { FilterPanel } from "@/components/FilterPanel/FilterPanel";
import { Dropdown, DropdownItem } from "@/components/Dropdown/Dropdown";
import { formatDateTime } from "@/lib/dateUtils";
import type { User, UserFilters, UserStatus } from "@/types/user";
import type { DashboardStats } from "@/types/dashboard";
import styles from "./page.module.scss";
import { ListFilter } from "lucide-react";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const search = searchParams.get("search") || "";
        const [usersResponse, statsResponse, orgsResponse] = await Promise.all([
          userService.getUsers(currentPage, recordsPerPage, filters, search),
          dashboardService.getStats(),
          dashboardService.getOrganizations(),
        ]);

        setUsers(usersResponse.data);
        setTotalPages(usersResponse.meta.totalPages);
        setTotalRecords(usersResponse.meta.totalRecords);
        setStats(statsResponse.data);
        setOrganizations(orgsResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, recordsPerPage, filters, searchParams]);

  const handleStatusUpdate = async (userId: string, status: UserStatus) => {
    try {
      await userService.updateUserStatus(userId, status);
      setUsers(users.map((u) => (u.id === userId ? { ...u, status } : u)));
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const handleApplyFilters = (newFilters: UserFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.statsGrid}>
        <StatCard title="Users" value={stats?.totalUsers || 0} icon="👥" />
        <StatCard
          title="Active Users"
          value={stats?.activeUsers || 0}
          icon="👤"
        />
        <StatCard
          title="Users with Loans"
          value={stats?.usersWithLoans || 0}
          icon="💵"
        />
        <StatCard
          title="Users with Savings"
          value={stats?.usersWithSavings || 0}
          icon="🏦"
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <div className={styles.thContent}>
                  ORGANIZATION
                  <button
                    className={styles.filterButton}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <ListFilter width={14} height={14} />
                  </button>
                </div>
              </th>
              <th>
                USERNAME <ListFilter width={14} height={14} />
              </th>
              <th>
                EMAIL <ListFilter width={14} height={14} />
              </th>
              <th>
                PHONE NUMBER <ListFilter width={14} height={14} />
              </th>
              <th>
                DATE JOINED <ListFilter width={14} height={14} />
              </th>
              <th>
                STATUS <ListFilter width={14} height={14} />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={styles.tableRow}>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  {user.organization}
                </td>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  {user.username}
                </td>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  {user.email}
                </td>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  {user.phoneNumber}
                </td>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  {formatDateTime(user.dateJoined)}
                </td>
                <td onClick={() => router.push(`/users/${user.id}`)}>
                  <StatusBadge status={user.status} />
                </td>
                <td>
                  <Dropdown
                    trigger={<span className={styles.menuTrigger}>⋮</span>}
                  >
                    <DropdownItem
                      onClick={() => router.push(`/users/${user.id}`)}
                    >
                      👁 View Details
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleStatusUpdate(user.id, "Blacklisted")}
                      variant="danger"
                    >
                      🚫 Blacklist User
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => handleStatusUpdate(user.id, "Active")}
                    >
                      ✅ Activate User
                    </DropdownItem>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showFilters && (
          <div className={styles.filterPanelWrapper}>
            <FilterPanel
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFilters(false)}
              organizations={organizations}
            />
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        onPageChange={setCurrentPage}
        onRecordsPerPageChange={setRecordsPerPage}
      />
    </div>
  );
}

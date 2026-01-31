"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StatCard } from "@/components/StatCard/StatCard";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardStats } from "@/types/dashboard";
import styles from "./page.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
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

      <div className={styles.quickActions}>
        <button
          onClick={() => router.push("/users")}
          className={styles.viewUsersButton}
        >
          View All Users →
        </button>
      </div>
    </div>
  );
}

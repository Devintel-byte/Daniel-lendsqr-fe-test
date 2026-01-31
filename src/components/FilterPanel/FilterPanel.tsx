"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import type { UserFilters, UserStatus } from "@/types/user";
import styles from "./FilterPanel.module.scss";

interface FilterPanelProps {
  onApplyFilters: (filters: UserFilters) => void;
  onClose: () => void;
  organizations: string[];
}

export function FilterPanel({
  onApplyFilters,
  onClose,
  organizations,
}: FilterPanelProps) {
  const [filters, setFilters] = useState<UserFilters>({});

  const handleInputChange = (field: keyof UserFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  };

  const handleReset = () => {
    setFilters({});
    onApplyFilters({});
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className={styles.panel}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="organization">Organization</label>
          <select
            id="organization"
            value={filters.organization || ""}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            className={styles.select}
          >
            <option value="">Select</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="User"
            value={filters.username || ""}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={filters.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={filters.date || ""}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={filters.phoneNumber || ""}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status || ""}
            onChange={(e) =>
              handleInputChange("status", e.target.value as UserStatus)
            }
            className={styles.select}
          >
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            fullWidth
          >
            Reset
          </Button>
          <Button type="submit" variant="primary" fullWidth>
            Filter
          </Button>
        </div>
      </form>
    </div>
  );
}

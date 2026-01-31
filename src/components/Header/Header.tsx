/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import styles from "./Header.module.scss";
import { Bell } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    document.cookie =
      "lendsqr-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/users?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="/logo.png"
          width={145}
          height={30}
          alt="Lendsqr Logo"
          className={styles.logoImage}
        />
      </div>

      <form className={styles.search} onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search for anything"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 0C2.2 0 0 2.2 0 5C0 7.8 2.2 10 5 10C6.1 10 7.1 9.6 7.9 9L12.3 13.3L13.7 11.9L9.4 7.6C10 6.8 10.4 5.9 10.4 5C10.4 2.2 8.2 0 5.4 0H5ZM5 2C6.9 2 8.4 3.5 8.4 5.4C8.4 7.3 6.9 8.8 5 8.8C3.1 8.8 1.6 7.3 1.6 5.4C1.6 3.5 3.1 2 5 2Z"
              fill="white"
            />
          </svg>
        </button>
      </form>

      <div className={styles.actions}>
        <a href="#" className={styles.link}>
          Docs
        </a>

        <button className={styles.notification}>
          <Bell />
        </button>

        <div className={styles.userSection}>
          <button
            className={styles.userButton}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.avatar}>{user?.name?.charAt(0) || "A"}</div>
            <span className={styles.userName}>{user?.name || "User"}</span>
            <span className={styles.arrow}>▼</span>
          </button>

          {showUserMenu && (
            <div className={styles.userMenu}>
              <button onClick={handleLogout} className={styles.menuItem}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

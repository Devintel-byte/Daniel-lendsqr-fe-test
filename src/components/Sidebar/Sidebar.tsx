"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./Sidebar.module.scss";

interface NavItem {
  label: string;
  icon: string;
  href: string;
  category?: string;
}

const navigation: NavItem[] = [
  { label: "Dashboard", icon: "🏠", href: "/dashboard" },

  // CUSTOMERS
  { label: "Users", icon: "👥", href: "/users", category: "CUSTOMERS" },
  {
    label: "Guarantors",
    icon: "👤",
    href: "/guarantors",
    category: "CUSTOMERS",
  },
  { label: "Loans", icon: "💵", href: "/loans", category: "CUSTOMERS" },
  {
    label: "Decision Models",
    icon: "🤝",
    href: "/decision-models",
    category: "CUSTOMERS",
  },
  { label: "Savings", icon: "🏦", href: "/savings", category: "CUSTOMERS" },
  {
    label: "Loan Requests",
    icon: "✋",
    href: "/loan-requests",
    category: "CUSTOMERS",
  },
  { label: "Whitelist", icon: "✓", href: "/whitelist", category: "CUSTOMERS" },
  { label: "Karma", icon: "⚖", href: "/karma", category: "CUSTOMERS" },

  // BUSINESSES
  {
    label: "Organization",
    icon: "🏢",
    href: "/organization",
    category: "BUSINESSES",
  },
  {
    label: "Loan Products",
    icon: "💳",
    href: "/loan-products",
    category: "BUSINESSES",
  },
  {
    label: "Savings Products",
    icon: "🏪",
    href: "/savings-products",
    category: "BUSINESSES",
  },
  {
    label: "Fees and Charges",
    icon: "💰",
    href: "/fees-charges",
    category: "BUSINESSES",
  },
  {
    label: "Transactions",
    icon: "🔄",
    href: "/transactions",
    category: "BUSINESSES",
  },
  { label: "Services", icon: "🔌", href: "/services", category: "BUSINESSES" },
  {
    label: "Service Account",
    icon: "👤",
    href: "/service-account",
    category: "BUSINESSES",
  },
  {
    label: "Settlements",
    icon: "📊",
    href: "/settlements",
    category: "BUSINESSES",
  },
  { label: "Reports", icon: "📈", href: "/reports", category: "BUSINESSES" },

  // SETTINGS
  {
    label: "Preferences",
    icon: "⚙",
    href: "/preferences",
    category: "SETTINGS",
  },
  {
    label: "Fees and Pricing",
    icon: "💵",
    href: "/fees-pricing",
    category: "SETTINGS",
  },
  {
    label: "Audit Logs",
    icon: "📋",
    href: "/audit-logs",
    category: "SETTINGS",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const categories = ["CUSTOMERS", "BUSINESSES", "SETTINGS"];

  const getItemsByCategory = (category?: string) => {
    if (!category) {
      return navigation.filter((item) => !item.category);
    }
    return navigation.filter((item) => item.category === category);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.switchOrg}>
        <span className={styles.icon}>💼</span>
        <span>Switch Organization</span>
        <span className={styles.arrow}>▼</span>
      </div>

      <nav className={styles.nav}>
        {/* Dashboard */}
        {getItemsByCategory().map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              styles.navItem,
              pathname === item.href && styles.active
            )}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        {/* Categories */}
        {categories.map((category) => (
          <div key={category} className={styles.category}>
            <h4 className={styles.categoryTitle}>{category}</h4>
            {getItemsByCategory(category).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  styles.navItem,
                  pathname.startsWith(item.href) && styles.active
                )}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

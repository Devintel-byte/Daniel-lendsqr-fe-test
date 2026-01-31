import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./StatCard.module.scss";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  className?: string;
}

export function StatCard({ title, value, icon, className }: StatCardProps) {
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value.toLocaleString()}</p>
    </div>
  );
}

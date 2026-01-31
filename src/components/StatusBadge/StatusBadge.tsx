import { cn } from "@/lib/utils";
import type { UserStatus } from "@/types/user";
import styles from "./StatusBadge.module.scss";

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(styles.badge, styles[status.toLowerCase()], className)}>
      {status}
    </span>
  );
}

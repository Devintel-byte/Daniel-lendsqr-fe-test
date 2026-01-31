"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({
  trigger,
  children,
  align = "right",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn(styles.dropdown, className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.trigger}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className={cn(styles.menu, styles[align])}>{children}</div>
      )}
    </div>
  );
}

interface DropdownItemProps {
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "danger";
}

export function DropdownItem({
  onClick,
  children,
  icon,
  variant = "default",
}: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.item, styles[variant])}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { userService } from "@/services/userService";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { Button } from "@/components/Button/Button";
import type { User, UserStatus } from "@/types/user";
import styles from "./page.module.scss";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleStatusUpdate = async (status: UserStatus) => {
    if (!user) return;

    setIsUpdating(true);
    try {
      const response = await userService.updateUserStatus(user.id, status);
      setUser(response.data);
      alert(
        `User ${
          status === "Blacklisted" ? "blacklisted" : "activated"
        } successfully`
      );
    } catch (error) {
      console.error("Failed to update user status:", error);
      alert("Failed to update user status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading user details...</div>;
  }

  if (!user) {
    return <div className={styles.error}>User not found</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/users" className={styles.backLink}>
        ← Back to Users
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <Button
            variant="danger"
            onClick={() => handleStatusUpdate("Blacklisted")}
            disabled={isUpdating || user.status === "Blacklisted"}
          >
            Blacklist User
          </Button>
          <Button
            variant="primary"
            onClick={() => handleStatusUpdate("Active")}
            disabled={isUpdating || user.status === "Active"}
          >
            Activate User
          </Button>
        </div>
      </div>

      <div className={styles.userCard}>
        <div className={styles.userHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.fullName.charAt(0)}</div>
            <div className={styles.userDetails}>
              <h2 className={styles.userName}>{user.fullName}</h2>
              <p className={styles.userId}>{user.id}</p>
            </div>
          </div>

          <div className={styles.userTier}>
            <p className={styles.tierLabel}>User&apos;s Tier</p>
            <div className={styles.stars}>
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < user.tier ? styles.starFilled : styles.starEmpty
                  }
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={styles.userAccount}>
            <h3 className={styles.accountBalance}>{user.accountBalance}</h3>
            <p className={styles.accountNumber}>
              {user.accountNumber}/{user.bankName}
            </p>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={activeTab === "general" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("general")}
          >
            General Details
          </button>
          <button
            className={
              activeTab === "documents" ? styles.tabActive : styles.tab
            }
            onClick={() => setActiveTab("documents")}
          >
            Documents
          </button>
          <button
            className={activeTab === "bank" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("bank")}
          >
            Bank Details
          </button>
          <button
            className={activeTab === "loans" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("loans")}
          >
            Loans
          </button>
          <button
            className={activeTab === "savings" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("savings")}
          >
            Savings
          </button>
          <button
            className={activeTab === "app" ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab("app")}
          >
            App and System
          </button>
        </div>
      </div>

      {activeTab === "general" && (
        <div className={styles.detailsCard}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Full Name</label>
                <p>{user.fullName}</p>
              </div>
              <div className={styles.field}>
                <label>Phone Number</label>
                <p>{user.phoneNumber}</p>
              </div>
              <div className={styles.field}>
                <label>Email Address</label>
                <p>{user.email}</p>
              </div>
              <div className={styles.field}>
                <label>BVN</label>
                <p>{user.bvn}</p>
              </div>
              <div className={styles.field}>
                <label>Gender</label>
                <p>{user.gender}</p>
              </div>
              <div className={styles.field}>
                <label>Marital Status</label>
                <p>{user.maritalStatus}</p>
              </div>
              <div className={styles.field}>
                <label>Children</label>
                <p>{user.children}</p>
              </div>
              <div className={styles.field}>
                <label>Type of Residence</label>
                <p>{user.typeOfResidence}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Education and Employment</h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Level of Education</label>
                <p>{user.levelOfEducation}</p>
              </div>
              <div className={styles.field}>
                <label>Employment Status</label>
                <p>{user.employmentStatus}</p>
              </div>
              <div className={styles.field}>
                <label>Sector of Employment</label>
                <p>{user.sectorOfEmployment}</p>
              </div>
              <div className={styles.field}>
                <label>Duration of Employment</label>
                <p>{user.durationOfEmployment}</p>
              </div>
              <div className={styles.field}>
                <label>Office Email</label>
                <p>{user.officeEmail}</p>
              </div>
              <div className={styles.field}>
                <label>Monthly Income</label>
                <p>{user.monthlyIncome}</p>
              </div>
              <div className={styles.field}>
                <label>Loan Repayment</label>
                <p>{user.loanRepayment}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Socials</h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Twitter</label>
                <p>{user.twitter}</p>
              </div>
              <div className={styles.field}>
                <label>Facebook</label>
                <p>{user.facebook}</p>
              </div>
              <div className={styles.field}>
                <label>Instagram</label>
                <p>{user.instagram}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Guarantor</h3>
            {user.guarantors.map((guarantor, index) => (
              <div key={index} className={styles.guarantorSection}>
                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label>Full Name</label>
                    <p>{guarantor.fullName}</p>
                  </div>
                  <div className={styles.field}>
                    <label>Phone Number</label>
                    <p>{guarantor.phoneNumber}</p>
                  </div>
                  <div className={styles.field}>
                    <label>Email Address</label>
                    <p>{guarantor.emailAddress}</p>
                  </div>
                  <div className={styles.field}>
                    <label>Relationship</label>
                    <p>{guarantor.relationship}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {activeTab === "bank" && (
        <div className={styles.detailsCard}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Bank Details</h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Account Number</label>
                <p>{user.accountNumber}</p>
              </div>
              <div className={styles.field}>
                <label>Bank Name</label>
                <p>{user.bankName}</p>
              </div>
              <div className={styles.field}>
                <label>Account Balance</label>
                <p>{user.accountBalance}</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {(activeTab === "documents" ||
        activeTab === "loans" ||
        activeTab === "savings" ||
        activeTab === "app") && (
        <div className={styles.detailsCard}>
          <div className={styles.emptyState}>
            <p>No {activeTab} information available</p>
          </div>
        </div>
      )}
    </div>
  );
}

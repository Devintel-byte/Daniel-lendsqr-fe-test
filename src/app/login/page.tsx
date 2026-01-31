/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { useAuthStore } from "@/store/authStore";
import styles from "./page.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login({ email, password });

      if (success) {
        // Set auth cookie
        document.cookie = "lendsqr-auth=true; path=/; max-age=86400";
        router.push(redirect);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo}>
            <img
              src="/logo.png"
              width={180}
              height={35}
              alt="Lendsqr Logo"
              className={styles.logoImage}
            />
          </div>
        </div>

        <div className={styles.illustration}>
          <Image
            src="/login-illustration.svg"
            alt="Welcome illustration"
            width={600}
            height={600}
            priority
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
              required
            />

            <div className={styles.passwordField}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

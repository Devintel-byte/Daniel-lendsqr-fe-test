"use client";

import { useEffect, useState, ReactNode } from "react";

export function MSWProvider({ children }: { children: ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMSW = async () => {
      if (typeof window !== "undefined") {
        const { worker } = await import("@/mocks/browser");

        try {
          await worker.start({
            onUnhandledRequest: "bypass",
          });

          setMswReady(true);
        } catch (error) {
          console.error("MSW failed to start:", error);
          // Continue anyway to not block the app
          setMswReady(true);
        }
      }
    };

    initMSW();
  }, []);

  if (!mswReady) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "Work Sans, sans-serif",
          color: "#213F7D",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #E5E7EB",
              borderTopColor: "#39CDCC",
              borderRadius: "50%",
              animation: "spin 0.6s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

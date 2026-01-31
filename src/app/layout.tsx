import type { Metadata } from "next";
import { MSWProvider } from "@/components/MSWProvider/MSWProvider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Lendsqr Dashboard",
  description: "User management dashboard for Lendsqr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}

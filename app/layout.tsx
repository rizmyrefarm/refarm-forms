import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReFarm Forms — Internal Platform",
  description: "Digital lifecycle forms platform for ReFarm Global",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#eef2ef] text-[#1a1f1c]">
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProdigyOS",
  description: "AI Productivity Operating System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

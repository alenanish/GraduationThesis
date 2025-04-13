"use client";
import { TopBar } from "./components/ui";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <TopBar />
        {children}
      </body>
    </html>
  );
}

"use client"
import { TopBar } from "@/app/components/ui";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth_context";
import TopBar from "./_components/top_bar";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/home");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }
  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  );
}

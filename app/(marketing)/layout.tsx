"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth_context";
import TopBar from "./_components/top_bar";
import Loading from "../components/ui/custom/loading";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isAuthenticated && !isLoading) {
    router.back();
    return;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  );
}

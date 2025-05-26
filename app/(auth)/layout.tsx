"use client";
import React, { ReactNode, useEffect } from "react";
import Logo from "@/app/components/assets/images/logo";
import { useAuth } from "../context/auth_context";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
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
    <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-y-4">
      <Logo variant="form" size={80} />
      {children}
    </div>
  );
};

export default AuthLayout;

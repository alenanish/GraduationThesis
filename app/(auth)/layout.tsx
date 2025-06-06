"use client";
import React, { ReactNode } from "react";
import Logo from "@/app/components/assets/images/logo";
import { useAuth } from "../context/auth_context";
import { useRouter } from "next/navigation";
import Loading from "../components/ui/custom/loading";

interface LayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isAuthenticated && !isLoading) {
    router.push('/home');
    return;
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-dvw h-dvh flex flex-col items-center justify-center gap-y-4">
      <Logo variant="form" size={80} />
      {children}
    </div>
  );
};

export default AuthLayout;

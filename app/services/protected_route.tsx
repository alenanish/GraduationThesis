"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../context/auth_context";
import Loading from "../components/ui/custom/loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

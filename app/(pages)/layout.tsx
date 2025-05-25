"use client";

import TopBar from "./_components/top_bar";
import ProtectedRoute from "../services/protected_route";
import { useAuth } from "../context/auth_context";
import TopBarForInvestor from "./_components/top_bar_for_investor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user?.role === "investor" ? <TopBarForInvestor /> : <TopBar />}

      <div className="mt-[52px] px-4 py-2 overflow-y-auto "> {children} </div>
    </ProtectedRoute>
  );
}

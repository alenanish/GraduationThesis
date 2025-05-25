"use client";
import React from "react";

import { useAuth } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";
import NotFoundPage from "@/app/not-found";
import TopBarStartup from "./_components/top_bar_startup";
import TopBarInvestor from "./_components/top_bar_investor";
import TopBarSpecialist from "./_components/top_bar_specialist";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <NotFoundPage />
  }
  
  return (
    <div className="w-full">
      {user.role === 'startup' && <TopBarStartup />}
      {user.role === 'specialist' && <TopBarSpecialist />}
      {user.role === 'investor' && <TopBarInvestor />}
      <div className="mt-10">{children}</div>
    </div>
  );
}

"use client";
import React from "react";
import TopBar from "./_components/top_bar";
import { useAuth } from "@/app/context/auth_context";
import NotFoundPage from "@/app/not-found";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <NotFoundPage />
  }

  return (
    <div className="mt-11 ">
      <TopBar />
      {children}
    </div>
  );
}

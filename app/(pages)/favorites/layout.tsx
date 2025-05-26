"use client";
import React from "react";

import { useAuth } from "@/app/context/auth_context";
import NotFoundPage from "@/app/not-found";
import TopBarFavourites from "./_components/top_bar_favorites";


export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <NotFoundPage />
  }
  
  return (
    <div className="w-full">
    <TopBarFavourites />
      <div className="mt-10">{children}</div>
    </div>
  );
}

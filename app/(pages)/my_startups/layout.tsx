"use client";
import React from "react";
import TopBar from "./_components/top_bar";
import { useAuth } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    useRouter().replace("/");
  }

  if (!user) {
    useRouter().replace("/");
  }

  if (!(user?.role === "startup" || user?.role === "specialist")) {
    useRouter().replace("/not-found");
  }

  return (
    <>
      {user?.role === "specialist" ? (
        <div className="w-full mt-10">
          <TopBar />
          <div>{children}</div>
        </div>
      ) : (
        <div className="w-full">
          <div>{children}</div>
        </div>
      )}
    </>
  );
}

"use client";
import React from "react";
import { useAuth } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";
import MyStartupsTopBar from "./_components/top_bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.replace("/");
    return;
  }

  if (!(user?.role === "startup" || user?.role === "specialist")) {
    router.replace("/not-found");
    return;
  }

  return (
    <>
      {user?.role === "specialist" ? (
        <div className="w-full mt-10">
          <MyStartupsTopBar />
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

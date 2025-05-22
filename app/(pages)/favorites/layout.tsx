"use client";
import React from "react";

import TopBar from "./_components/top_bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
      <TopBar />
      <div className="mt-10">{children}</div>
    </div>
  );
}

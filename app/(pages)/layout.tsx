"use client";

import TopBar from "./_components/top_bar";
import ProtectedRoute from "../services/protected_route";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <ProtectedRoute>
      <TopBar />
      <div className="mt-[60px] px-4"> {children} </div>
    </ProtectedRoute>
  );
}

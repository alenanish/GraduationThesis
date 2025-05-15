"use client";

import TopBar from "./_components/top_bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <div>{children}</div>
    </>
  );
}

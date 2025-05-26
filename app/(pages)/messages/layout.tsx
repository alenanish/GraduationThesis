"use client";
import React from "react";
import Dialogs from "./_components/dialogs_bar/dialogs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row overflow-hidden gap-4">
      <div className="w-64 h-full relative left-0 overflow-y-auto bg-gray-100">
        <Dialogs />
      </div>
      <div className="ml-64  flex-grow w-full overflow-y-auto ">
        {" "}
        {children}
      </div>
    </div>
  );
}

"use client";
import React from "react";

import { useAuth } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";
import SearchSpecStartups from "./(specialists)/search_spec_sratups";
import SearchInvestStartups from "./(investors)/search_invest_sratups.tsx";

const SearchStartups = () => {
  const { user } = useAuth();
  const router = useRouter();

  const role = user?.role;

  if (!user) {
    router.replace("/");
    return;
  }

  if (!(user?.role === "specialist" || user?.role === "investor")) {
    router.replace("/not-found");
    return;
  }

  return (
    <>
      {role === "investor" && <SearchInvestStartups />}
      {role === "specialist" && <SearchSpecStartups />}
    </>
  );
};

export default SearchStartups;

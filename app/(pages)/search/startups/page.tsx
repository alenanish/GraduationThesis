"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/context/auth_context";
import Loading from "@/app/components/ui/custom/loading";
import { useRouter } from "next/navigation";
import SearchInvestStartups from "./(investors)/search_invest_sratups";
import SerchSpecStartups from "./(specialists)/search_spec_sratups.tsx";

const SearchStartups = () => {
  const { user } = useAuth();

  const role = user?.role;

  if (!user) {
    useRouter().replace("/");
  }

  if (!(user?.role === "specialist" || user?.role === "investor")) {
    useRouter().replace("/not-found");
  }

  return (
    <>
      {role === "investor" && <SearchInvestStartups />}
      {role === "specialist" && <SerchSpecStartups />}
    </>
  );
};

export default SearchStartups;

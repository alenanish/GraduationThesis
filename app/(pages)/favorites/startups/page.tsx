"use client";
import React from "react";

import { useAuth } from "@/app/context/auth_context";
import NotFoundPage from "@/app/not-found";
import FavouriteStartups from "./_components/startups";
import FavouriteStartupsForInvest from "./_components/for_investments";

const FavoriteStartups = () => {
  const { user } = useAuth();

  if (!user) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full">
      {(user.role === "startup" || user.role === "specialist") && (
        <FavouriteStartups />
      )}
      {user.role === "investor" && <FavouriteStartupsForInvest />}
    </div>
  );
};

export default FavoriteStartups;

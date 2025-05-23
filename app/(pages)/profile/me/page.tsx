"use client";
import React from "react";
import { useAuth } from "../../../context/auth_context";
import FounderProfile from "./_roles/founder_profile";
import InvestorProfile from "./_roles/investor_profile";
import SpecialistProfile from "./_roles/specialist_profile";

const ProfilePage = () => {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) {
    logout();
    return;
  }
  const role = user?.role;

  if (!user) {
    logout();
  }

  return (
    <div className="w-full pt-1">
      {role === "startup" ? (
        <FounderProfile />
      ) : role === "investor" ? (
        <InvestorProfile />
      ) : role === "specialist" ? (
        <SpecialistProfile />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfilePage;

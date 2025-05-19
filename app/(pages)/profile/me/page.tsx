"use client";
import React from "react";
import { useAuth } from "../../../context/auth_context";
import FounderProfile from "./_roles/founder_profile";
import InvestorProfile from "./_roles/investor_profile";
import SpecialistProfile from "./_roles/specialist_profile";

const ProfilePage = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div className="w-full pt-1">
      {role === "startup" ? (
        <FounderProfile />
      ) : role === "investor" ? (
        <InvestorProfile />
      ) : role === "specialist" ? (
        <SpecialistProfile />
      ) : (
        <p>Неизвестная роль пользователя.</p>
      )}
    </div>
  );
};

export default ProfilePage;

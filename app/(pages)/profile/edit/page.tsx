"use client";
import React, { useState } from "react";
import { useAuth } from "../../../context/auth_context";
import InvestorProfile from "./_roles/investor_profile_edit";
import SpecialistProfile from "./_roles/specialist_profile_edit";
import FounderProfileEdit from "./_roles/founder_profile_edit";

const ProfilePage = () => {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <div className="w-full">
      {role === "startup" ? (
        <FounderProfileEdit />
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

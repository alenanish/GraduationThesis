"use client";
import React, { useEffect } from "react";
import { useAuth } from "../../context/auth_context";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;

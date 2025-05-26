"use client";
import React, { useEffect } from "react";
import { useAuth } from "../../context/auth_context";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <></>;
};

export default Logout;

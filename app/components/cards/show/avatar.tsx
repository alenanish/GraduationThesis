"use client";

import React from "react";

interface AvatarProps {
  avatar?: string | null;
  role: "user" | "startup";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, role, className = "" }) => {
  return (
    <img
    alt="User avatar"
      src={
        avatar
          ? avatar
          : role === "user"
          ? "/default-user.png"
          : "/default-startup.png"
      }
      className={`${className} h-auto object-cover`}
    />
  );
};

export default Avatar;

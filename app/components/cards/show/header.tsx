"use client";
import React from "react";

interface HeaderProps {
  title?: string | null;
  subTitle?: string | null;
  button?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subTitle, button }) => {
  return (
    <div className="flex flex-row justify-between ">
      <div className="flex flex-row gap-x-4 items-center">
        <h2 className="text-h4 text-base-900">{title}</h2>
        <h2 className="text-h4 text-base-900">-</h2>
        <p className="text-base-700 text-body-s font-medium ">{subTitle}</p>
      </div>
      <div>{button}</div>
    </div>
  );
};

export default Header;

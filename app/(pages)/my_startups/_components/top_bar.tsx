"use client";
import React, { useState } from "react";

import Link from "next/link";
import { TopBarButton } from "@/app/components/ui";

const TopBar = () => {
  const [activeItem, setActiveItem] = useState("Текущие");

  const menuItems = [
    {
      label: "Текущие",
      href: "/my_startups",
    },
    {
      label: "Новые",
      href: "/my_startups/new",
    },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const menuButtons = () => {
    return (
      <div className="flex flex-row gap-1">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} passHref>
            <TopBarButton
              color="prime"
              size="xs"
              isActive={activeItem === item.label}
              onClick={() => handleItemClick(item.label)}
            >
              {item.label}
            </TopBarButton>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <header className="fixed top-13 left-0 p-2 bg-base-0 w-full h-10 flex flex-row items-center justify-between">
      <div className="items-center">{menuButtons()}</div>
    </header>
  );
};

export default TopBar;

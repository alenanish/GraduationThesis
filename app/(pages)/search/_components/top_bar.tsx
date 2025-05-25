"use client";
import React, { useState } from "react";

import Link from "next/link";
import { TopBarButton } from "@/app/components/ui";

const TopBar = () => {
  const [activeItem, setActiveItem] = useState("Стартапы");

  const menuItems = [
    { label: "Стартапы", href: "/search/startups"},
    {
      label: "Специалисты",
      href: "/search/specislists",
      color: "base",
      isActive: false,
    },
    {
      label: "Инвесторы",
      href: "/search/investors",
      color: "base",
      isActive: false,
    },
    {
      label: "Для инвестирования",
      href: "/search/for_investments",
      color: "base",
      isActive: false,
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

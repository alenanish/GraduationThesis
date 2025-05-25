"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TopBarButton } from "@/app/components/ui";

interface MenuItem {
  label: string;
  href: string;
}

const TopBarSpecialist = ({ }) => {
  const [activeItem, setActiveItem] = useState("Стартапы");

  const menuItemsSpecialist: MenuItem[] = [
    {
      label: "Стартапы",
      href: "/favorites/startups",
    },
    {
      label: "Специалисты",
      href: "/favorites/specialists",
    },
    {
      label: "Инвесторы",
      href: "/favorites/investors",
    },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

 

  const menuButtons = () => {
    return (
      <div className="flex flex-row gap-1">
        {menuItemsSpecialist.map((item) => (
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

export default TopBarSpecialist;
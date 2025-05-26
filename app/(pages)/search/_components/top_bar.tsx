"use client";
import React, { useState } from "react";

import Link from "next/link";
import { TopBarButton } from "@/app/components/ui";
import { useAuth } from "@/app/context/auth_context";

const TopBar = () => {
  const [activeItem, setActiveItem] = useState("Стартапы");
  const { user } = useAuth();
  const menuItemsFounder = [
    {
      label: "Специалисты",
      href: "/search/specialists",
    },
    {
      label: "Инвесторы",
      href: "/search/investors",
      isActive: false,
    },
  ];

  const menuItemsInvestor = [
    { label: "Стартапы", href: "/search/startups" },
    {
      label: "Инвесторы",
      href: "/search/investors",
      isActive: false,
    },
  ];

  const menuItemsSpecialist = [
    { label: "Стартапы", href: "/search/startups" },
    {
      label: "Инвесторы",
      href: "/search/investors",
    },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const menuButtons = () => {
    return (
      <div className="flex flex-row gap-1">
        {user?.role == "startup" && (
          <>
            {menuItemsFounder.map((item) => (
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
          </>
        )}

        {user?.role == "investor" && (
          <>
            {menuItemsInvestor.map((item) => (
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
          </>
        )}

        {user?.role == "specialist" && (
          <>
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
          </>
        )}
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

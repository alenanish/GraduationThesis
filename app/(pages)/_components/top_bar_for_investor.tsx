"use client";
import React, { useState } from "react";

import Logo from "../../components/assets/images/logo";
import { DropDownMenu, TopBarButton } from "../../components/ui/index";
import { DefaultAccount, Menu } from "../../components/icons";
import Link from "next/link";

const menuItems = [
  { label: "Главная", href: "/home" },
  { label: "Избранное", href: "/favorites/startups" },
  { label: "Сообщения", href: "/messages" },
  { label: "Поиск", href: "/search" },
];

const TopBarForInvestor = () => {
  const [isMobile] = useState(false);

  const profileItems = [
    { label: "Профиль", href: "/profile/me" },
    { label: "Выйти", href: "/logout", color: "base" },
  ];

  const menuButtons = () => {
    if (isMobile) {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/home"} passHref>
            <Logo size={36} variant="top-bar" />
          </Link>
          <DropDownMenu
            icon={<Menu size={24} />}
            options={menuItems}
            position="right"
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/home"} passHref>
            <Logo size={36} variant="top-bar" />
          </Link>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <TopBarButton color="prime" size="s">
                {item.label}
              </TopBarButton>
            </Link>
          ))}
        </div>
      );
    }
  };

  const profileDropDown = () => {
    return (
      <DropDownMenu
        variant="tertiary"
        icon={<DefaultAccount color="var(--color-prime-500)" size={40} />}
        options={profileItems}
        position="left"
      />
    );
  };

  return (
    <header className="fixed z-70 top-0 left-0 p-2 bg-base-0 w-full h-13 flex flex-row items-center justify-between">
      <div className="items-center">{menuButtons()}</div>

      <div className="flex flex-row gap-1">{profileDropDown()}</div>
    </header>
  );
};

export default TopBarForInvestor;

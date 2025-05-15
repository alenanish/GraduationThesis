"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/assets/images/logo";
import { DropDownMenu, TopBarButton } from "@/app/components/ui";
import { Menu } from "@/app/components/icons";

const menuItems = [
  { label: "Главная", href: "/" },
  { label: "Поиск", href: "/search" },
];

const TopBar = () => {
  const [isMobile] = useState(true);

  const menuButtons = () => {
    if (isMobile) {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/"}>
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
          <Link href={"/"}>
            <Logo size={36} variant="top-bar" />
          </Link>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href} passHref>
              <TopBarButton  color="prime" size="s">
                {item.label}
              </TopBarButton>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <header className=" fixed top-0 z-50 p-2 bg-base-0 w-full h-13 flex flex-row items-center justify-between">
      <div className="items-center">{menuButtons()}</div>

      <div className="flex flex-row gap-1">
        {
          <>
            <Link href="/login" passHref>
              <TopBarButton color="prime" size="s">
                Войти
              </TopBarButton>
            </Link>
            <Link href="/register" passHref>
              <TopBarButton color="base" size="s">
                Регистрация
              </TopBarButton>
            </Link>
          </>
        }
      </div>
    </header>
  );
};

export default TopBar;

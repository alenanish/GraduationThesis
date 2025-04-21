"use client"
import React, { useState, useEffect } from "react";

import Logo from "../../assets/images/logo";
import { DropDownMenu, IconButton, TopBarButton } from "../index";
import { DefaultAccount, Menu } from "../../icons";
import Link from "next/link";

const menuItems = [
  { label: "Главная", ref: "/home" },
  { label: "Мои стартапы", ref: "/my_startups" },
  { label: "Избранное", ref: "/favourites" },
  { label: "Сообщения", ref: "/messages" },
  { label: "Поиск", ref: "/search" },
];

const profileItems = [
  { label: "Профиль", ref: "/profile" },
  { label: "Выйти", ref: "/logout", color: 'base' },
];

const TopBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuButtons = () => {
    if (isMobile) {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/home"}>
            <Logo size={36} variant="top-bar" />
          </Link>
          <DropDownMenu icon={<Menu size={24} />} options={menuItems} position="right" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/home"}>
            <Logo size={36} variant="top-bar" />
          </Link>
          {menuItems.map((item) => (
            <Link href={item.ref} key={item.label}>
              <TopBarButton color="prime" size="s">
                {item.label}
              </TopBarButton>
            </Link>
          ))}
        </div>
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 p-2 bg-base-0 w-full h-13 flex flex-row items-center justify-between">
      <div className="items-center">{menuButtons()}</div>

      <div className="flex flex-row gap-1">
        {isLoggedIn ? (
          <DropDownMenu
            icon={<DefaultAccount size={40} />}
            options={profileItems}
            position="left"
          />
        ) : (
          <>
            <TopBarButton color="prime" size="s">
              Войти
            </TopBarButton>
            <TopBarButton color="base" size="s">
              Регистрация
            </TopBarButton>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;

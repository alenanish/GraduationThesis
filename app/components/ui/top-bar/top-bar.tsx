"use client";
import React, { useState, useEffect } from "react";

import Logo from "../../assets/images/logo";
import { DropDownMenu, IconButton, TopBarButton } from "../index";
import { DefaultAccount, Menu } from "../../icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { label: "Главная", ref: "/home" },
  { label: "Мои стартапы", ref: "/my_startups" },
  { label: "Избранное", ref: "/favourites" },
  { label: "Сообщения", ref: "/messages" },
  { label: "Поиск", ref: "/search" },
];

const profileItems = [
  { label: "Профиль", ref: "/profile" },
  { label: "Выйти", ref: "/logout", color: "base", action: "logout" },
];

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(true);
      {
        /* setIsLoggedIn(false); */
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  const menuButtons = () => {
    if (isMobile) {
      return (
        <div className="flex flex-row gap-1">
          <Link href={"/home"}>
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

  const profileDropDown = () => {
    return (
      <DropDownMenu
        icon={<DefaultAccount size={40} />}
        options={profileItems.map((item) => ({
          ...item,
          onClick: item.action === "logout" ? handleLogout : undefined,
        }))}
        position="left"
      />
    );
  };

  return (
    <header className="sticky top-0 z-50 p-2 bg-base-0 w-full h-13 flex flex-row items-center justify-between">
      <div className="items-center">{menuButtons()}</div>

      <div className="flex flex-row gap-1">
        {isLoggedIn ? (
          profileDropDown()
        ) : (
          <>
            <Link href="/login">
              <TopBarButton color="prime" size="s">
                Войти
              </TopBarButton>
            </Link>
            <Link href="/register">
              <TopBarButton color="base" size="s">
                Регистрация
              </TopBarButton>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default TopBar;

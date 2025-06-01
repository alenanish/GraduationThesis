"use client";
import React, { useState } from "react";

import Logo from "../../components/assets/images/logo";
import { DropDownMenu, TopBarButton } from "../../components/ui/index";
import { DefaultAccount, Menu } from "../../components/icons";
import { useAuth } from "@/app/context/auth_context";
import { useRouter } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: Record<string, MenuItem[]> = {
  startup: [
    { label: "Главная", href: "/home" },
    { label: "Мои стартапы", href: "/my_startups" },
    { label: "Избранное", href: "/favorites/startups" },
    { label: "Сообщения", href: "/messages" },
    { label: "Поиск", href: "/search/specialists" },
  ],
  specialist: [
    { label: "Главная", href: "/home" },
    { label: "Мои стартапы", href: "/my_startups" },
    { label: "Избранное", href: "/favorites/startups" },
    { label: "Сообщения", href: "/messages" },
    { label: "Поиск", href: "/search/startups" },
  ],
  investor: [
    { label: "Главная", href: "/home" },
    { label: "Избранное", href: "/favorites/startups" },
    { label: "Сообщения", href: "/messages" },
    { label: "Поиск", href: "/search/startups" },
  ],
};

const TopBar = () => {
  const { user, isUserProfileComplited } = useAuth();
  const [isMobile] = useState(false);
  const router = useRouter();
  if (!user?.role) return;

  const profileItems = [
    { label: "Профиль", href: "/profile/me" },
    { label: "Выйти", href: "/logout", color: "base" },
  ];

  const menuButtons = () => {
    if (isMobile && isUserProfileComplited) {
      return (
        <div className="flex flex-row gap-1">
          <div
            onClick={() => {
              router.push(isUserProfileComplited ? "/home" : "");
            }}
          >
            <Logo size={36} variant="top-bar" />
          </div>
          <DropDownMenu
            icon={<Menu size={24} />}
            options={menuItems[user?.role]}
            position="right"
          />
        </div>
      );
    } else if (isUserProfileComplited) {
      return (
        <div className="flex flex-row gap-1">
          <div
            onClick={() => {
              router.push(isUserProfileComplited ? "/home" : "");
            }}
          >
            <Logo size={36} variant="top-bar" />
          </div>

          <>
            {menuItems[user.role].map((item) => (
              <TopBarButton
                key={item.label}
                onClick={() => router.push(item.href)}
              >
                {item.label}
              </TopBarButton>
            ))}
          </>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            router.push(isUserProfileComplited ? "/home" : "");
          }}
        >
          <Logo size={36} variant="top-bar" />
        </div>
      );
    }
  };

  const profileDropDown = () => {
    return (
      <DropDownMenu
        variant="tertiary"
        icon={  <DefaultAccount color="var(--color-prime-500)" size={40} />}
        options={
          isUserProfileComplited
            ? profileItems
            : [{ label: "Выйти", href: "/logout", color: "base" }]
        }
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

export default TopBar;

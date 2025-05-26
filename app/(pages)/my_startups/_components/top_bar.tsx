"use client";
import React, { useState, useEffect } from "react";
import { TopBarButton } from "@/app/components/ui";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/auth_context";

interface MenuItem {
  label: string;
  href: string;
}

const MyStartupsTopBar = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [activeItem, setActiveItem] = useState<string>("");

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

  useEffect(() => {
    if (!user?.role) return;
    const items = menuItems;
    const currentItem = items.find((item) => pathname.endsWith(item.href));
    if (currentItem) {
      setActiveItem(currentItem.label);
    }
  }, [pathname, user?.role, menuItems]);

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item.label);
    router.push(item.href);
  };

  if (!user?.role) {
    return null;
  }

  return (
    <header className="fixed top-13 left-0 p-2 bg-base-0 w-full h-10 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-1 items-center">
        {menuItems.map((item) => (
          <TopBarButton
            key={item.label}
            onClick={() => handleItemClick(item)}
            isActive={activeItem === item.label}
            size="xs"
          >
            {item.label}
          </TopBarButton>
        ))}
      </div>
    </header>
  );
};

export default MyStartupsTopBar;

import React, { useState, useEffect, useRef } from "react";
import Input from "../input/input";
import { Search, Menu } from "lucide-react";
import Logo from "../../assets/images/logo";
import TopBarButton from "./top-bar-button";
import IconButton from "../button/icon-button";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Стартапы", href: "#startups" },
  { label: "Работники", href: "#workers" },
  { label: "Инвесторы", href: "#investors" },
  { label: "Сообщения", href: "#messages" },
];

interface DropmenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dropmenu: React.FC<DropmenuProps> = ({ isOpen, onClose }) => {
  return (
    isOpen && (
      <div className="absolute left-0 mt-2 w-[133px] bg-base-0 z-10">
        {menuItems.map((item) => (
          <TopBarButton
            key={item.label}
            variant="top-bar-menu"
            size="s"
            className="w-full"
            onClick={() => {
              console.log(`Clicked on ${item.label}`);
            }}
          >
            {item.label}
          </TopBarButton>
        ))}
      </div>
    )
  );
};

const TopBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 460);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setIsMobile(containerRef.current.offsetWidth < 460);
      } else {
        setIsMobile(window.innerWidth < 460);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const menuButtons = () => {
    if (isMobile) {
      return (
        <div className="relative">
          <IconButton variant="secondary" size="s" onClick={toggleMenu}>
            <Menu size={20} />
          </IconButton>

          <Dropmenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row">
          <Logo size={36} />
          {menuItems.map((item) => (
            <TopBarButton
              key={item.label}
              color="prime"
              size="s"
              onClick={() => {
                console.log(`Clicked on ${item.label}`);
              }}
            >
              {item.label}
            </TopBarButton>
          ))}
        </div>
      );
    }
  };

  return (
    <header className="bg-base-0 w-full h-fit p-2 grid grid-cols-3 items-center  border-red-500 gap-2">
      <div className="items-center col-span-1" ref={containerRef}>
        {menuButtons()}
      </div>

      <div className="items-center col-span-1">
        <Input
          state="enabled"
          size="S"
          placeholder="Поиск"
          rightIcon={<Search size={16} />}
          isIconActive={true}
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      <div className="items-center col-span-1 flex flex-row justify-self-end">
        {isLoggedIn ? (
          <>
            <TopBarButton color="prime" size="s">
              Button
            </TopBarButton>
            <TopBarButton color="prime" size="s">
              Button
            </TopBarButton>
          </>
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

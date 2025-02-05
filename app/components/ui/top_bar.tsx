import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { Search } from "lucide-react";
import Logo from "../assets/images/logo";
import TopBarButton from "./top_bar_button";

const TopBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации

  return (
    <header className={`bg-base-0 w-full h-13 p-2 grid grid-cols-4 gap-1`}>
        
      
      <div className=" flex col-span-1 ">
      <Logo size={36} />
        <TopBarButton color="prime" size="s">
          Стартапы
        </TopBarButton>
        <TopBarButton color="prime" size="s">
          Работники
        </TopBarButton>
        <TopBarButton color="prime" size="s">
          Инвесторы
        </TopBarButton>
        <TopBarButton color="prime" size="s">
          Сообщения
        </TopBarButton>
      </div>

      <div className="flex col-span-1 ">
        <Input
          state="active"
          size="S"
          placeholder="Поиск"
          rightIcon={<Search size={16} />}
          isIconActive={true}
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      <div className=" col-span-1">
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
          <div className=" flex ">
            <TopBarButton color="prime" size="s">
              Войти
            </TopBarButton>
            <TopBarButton color="base" size="s">
              Регистрация
            </TopBarButton>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;

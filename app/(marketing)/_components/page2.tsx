"use client";
import { Button } from "@/app/components/ui";
import React from "react";
import AdvantageList from "./AdvantageList";
import Link from "next/link";

const advantages = [
  "Уникальная возможность работать над инновационными проектами.",
  "Быстрый профессиональный рост в гибкой команде.",
  "Шанс стать частью чего-то нового и значимого.",
];

const MarketingPage2 = () => {
  return (
    <div className=" min-h-[calc(100vh-72px)] bg-base-0 p-8 flex flex-col rounded-[14px] gap-y-4">
      <div className="mb-8">
        <h1 className="text-base-900 font-medium text-4xl flex-wrap">
          Найди свою роль в инновациях и расти вместе с лучшими стартапами
        </h1>
      </div>
      <div className="flex-grow grid grid-cols-5 gap-8 ">
        <div className="col-span-3 flex flex-col justify-between ">
          <p className="flex-wrap text-base-400">
            Ищешь работу, которая вдохновляет? Хочешь получить опыт в
            инновационной среде? На нашей платформе ты можешь найти стартапы,
            которые ищут таких, как ты – энергичных, талантливых и готовых к
            вызовам.
          </p>
          <div className="mt-4">
            <p className="flex-wrap text-base-700">Почему это интересно?</p>

            <AdvantageList advantages={advantages} />
          </div>
          <p className="flex-wrap text-base-700">
            Создай свой профиль, покажи свои навыки и открой двери в мир
            стартапов.
          </p>
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/register"} passHref className="w-full">
              <Button size="l" className="w-full">
                Начать карьерный путь
              </Button>
            </Link>
            <Link href={"/login"} passHref>
              <Button size="l" variant="tertiary" color="base">
                Войти
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-grow col-span-2 flex h-full bg-[url(/Illustration2.png)] bg-cover bg-center"></div>
      </div>
    </div>
  );
};

export default MarketingPage2;

"use client";
import React from "react";
import { Button } from "@/app/components/ui";
import AdvantageList from "./AdvantageList";
import Link from "next/link";

const advantages = [
  "Доступ к базе талантливых специалистов.",
  "Возможность рассказать о своем проекте и найти поддержку.",
  "Легкий поиск инвесторов, готовых вложиться в перспективные стартапы.",
];

const MarketingPage3 = () => {
  return (
    <div className=" min-h-[calc(100vh-72px)] bg-base-0 p-8 flex flex-col rounded-[14px] gap-y-4">
      <div className="mb-8">
        <h1 className="text-base-900 font-medium text-4xl flex-wrap">
          Собери команду и найди инвесторов для воплощения своих идей
        </h1>
      </div>
      <div className="flex-grow grid grid-cols-5 gap-8 ">
        <div className="flex-grow col-span-2 flex h-full bg-[url(/Illustration3.png)] bg-cover bg-center"></div>

        <div className="col-span-3 flex flex-col justify-between">
          <p className="flex-wrap text-base-400">
            Найди свою команду и ресурсы для старта! Ты разработал идею и готов
            её реализовать? Мы поможем тебе собрать команду профессионалов и
            найти инвесторов, которые поддержат твой проект.
          </p>
          <div className="mt-4">
            <p className="flex-wrap text-base-700">Наши преимущества:</p>
            <AdvantageList advantages={advantages} />
          </div>
          <p className="flex-wrap text-base-700">
            Твой стартап достоин успеха. Воплоти свои идеи в жизнь вместе с
            нами!
          </p>
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/register"} passHref className="w-full">
              <Button size="l" className="w-full">
                Воплотить идею в жизнь
              </Button>
            </Link>
            <Link href={"/login"} passHref>
              <Button size="l" variant="tertiary" color="base">
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage3;

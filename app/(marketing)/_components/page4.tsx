import React from "react";
import { Button } from "@/app/components/ui";
import AdvantageList from "./AdvantageList";
import Link from "next/link";

const advantages = [
  "Удобный доступ к широкому спектру стартапов из разных сфер.",
  "Возможность следить за развитием проектов и управлять своими инвестициями.",
  "Платформа для общения с командами и отслеживания результатов.",
];

const MarketingPage4 = () => {
  return (
    <div className=" min-h-[calc(100vh-72px)] bg-base-0 p-8 flex flex-col rounded-[14px] gap-y-4">
      <div className="">
        <h1 className="text-base-900 font-medium text-4xl flex-wrap">
          Вкладывай в стартапы, которые меняют мир.
        </h1>
        <p className="flex-wrap text-base-400">
          Ищете перспективные проекты для инвестиций? Мы предоставляем
          платформу, где вы можете найти стартапы, которые готовы менять мир.
          Каждый проект проходит предварительный отбор, чтобы гарантировать его
          потенциал.
        </p>
      </div>
      <div className="flex-grow h-full grid grid-cols-2 gap-4">
        <div className="flex-grow col-span-1 flex h-full bg-[url(/Illustration4.png)] bg-cover bg-center"></div>

        <div className="flex-grow col-span-1 flex h-full bg-[url(/Illustration5.png)] bg-cover bg-center"></div>
      </div>
      <div >
        <div className="flex flex-col">
          <div className="mt-4">
            <p className="flex-wrap text-base-700">Что вы получаете?</p>
            <AdvantageList advantages={advantages} />
          </div>
          <p className="flex-wrap text-base-700">
            Откройте для себя новые горизонты и сделайте вклад в успех
            завтрашнего дня
          </p>
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/register"} passHref className="w-full">
              <Button size="l" className="w-full">
                Начать инвестировать
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

export default MarketingPage4;

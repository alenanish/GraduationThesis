import { Gmail, Tg, Vk } from "@/app/components/icons";
import { IconButton } from "@/app/components/ui";
import React from "react";

const MarketingPage1 = () => {
  return (
    <div className=" min-h-[calc(100vh-72px)] bg-base-0 p-8 flex flex-col rounded-[14px] gap-y-4">
      <div className="grid grid-cols-5 gap-8">
        <h1 className=" col-span-3 text-base-900 font-medium text-4xl flex-wrap">
          Объединяем таланты, идеи и инвестиции для создания будущего
        </h1>
        <p className=" col-span-2 flex-wrap  text-base-400">
          Мы – платформа, объединяющая талантливых работников, амбициозных
          стартаперов и дальновидных инвесторов. Наша миссия – создать
          пространство, где встречаются идеи, ресурсы и возможности.
        </p>
      </div>
      <div className="flex-grow grid grid-cols-5 gap-8 ">
        <div className="col-span-3 flex h-full bg-[url(/Illustration1.png)] bg-cover bg-center"></div>

        <div className="col-span-2  flex flex-col justify-between ">
          <p className="flex-wrap text-base-400">
            Мы верим, что каждый проект начинается с команды, а каждая команда –
            с подходящих людей. Наша цель – помочь вам найти единомышленников,
            которые разделят вашу страсть, поддержат вашу идею и помогут
            воплотить мечты в реальность.
          </p>
          <div className="flex flex-row justify-between">
            <IconButton variant="tertiary" size="l" color="base">
              <Tg size={88} />
            </IconButton>
            <IconButton variant="tertiary" size="l" color="base">
              <Vk size={88} />
            </IconButton>
            <IconButton variant="tertiary" size="l" color="base">
              <Gmail size={88} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage1;

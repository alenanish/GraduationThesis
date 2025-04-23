"use client";
import { Startup } from "@/app/components/types/startup";
import { StartupCardSpecialist } from "@/app/components/ui";
import Carousel from "@/app/components/ui/сarousel";
import React from "react";




const startups_data: Startup[] = [
  {
    id: 123,
    title: "Инновационные решения для умного дома",
    industry: "Интернет вещей (IoT)",
    description:
      "Разработка платформы для управления умным домом, обеспечивающей энергоэффективность, безопасность и комфорт.  Современные технологии достигли  Современные технологии достигли",
    required_specialists: [
      { profession: "Разработчик встроенных систем" },
      { profession: "Frontend-разработчик (React)" },
      { profession: "UI/UX дизайнер" },
    ],
    is_favorited: true,
    id_founder: 456,
  },
  {
    id: 456,
    title: "Сервис онлайн-психологической поддержки",
    industry: "HealthTech",
    description:
      "Предоставление анонимной и доступной онлайн-терапии через видеозвонки и текстовые сообщения.  Современные технологии достигли  Современные технологии достигли",
    required_specialists: [
      { profession: "Клинический психолог" },
      { profession: "Психотерапевт" },
      { profession: "Разработчик мобильных приложений" },
    ],
    is_favorited: false,
    id_founder: 789,
  },
  {
    id: 789,
    title: "Платформа для обучения программированию в VR",
    industry: "EdTech",
    description:
      "Иммерсивная платформа, позволяющая изучать программирование в виртуальной реальности, делая обучение более интерактивным и увлекательным.  Современные технологии достигли  Современные технологии достигли",
    required_specialists: [
      { profession: "VR разработчик (Unity/Unreal)" },
      { profession: "Преподаватель программирования" },
      { profession: "3D-моделлер" },
    ],
    is_favorited: true,
    id_founder: 123,
  },
  {
    id: 987,
    title: "Агрегатор скидок и промокодов на продукты питания",
    industry: "RetailTech",
    description:
      "Мобильное приложение, собирающее информацию о скидках и промокодах из различных магазинов и супермаркетов, помогая пользователям экономить на покупках продуктов. Современные технологии достигли и уточнения вывода текущих активов. Современные технологии достигли",
    required_specialists: [
      { profession: "Backend-разработчик (Node.js)" },
      { profession: "Data Scientist" },
      { profession: "Маркетолог" },
    ],
    is_favorited: false,
    id_founder: 654,
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-4 my-4">
      <Carousel
        items={[
          {
            id: 1,
            imageUrl: "image1.png",
            altText: "Image 1",
            title: "Title 1",
            description: "Description 1",
          },
          {
            id: 2,
            imageUrl: "image2.png",
            altText: "Image 2",
            title: "Title 2",
            description: "Description 2",
          },
          {
            id: 3,
            imageUrl: "image3.png",
            altText: "Image 3",
            title: "Title 3",
            description: "Description 3",
          },
        ]}
      />

      <div className="mx-4 bg-base-0  rounded-[14px] p-4 flex flex-col gap-y-5">
        <h2 className="text-base-900 text-h4 font-medium">Рекомендации</h2>
        {startups_data.map((startup_data) => (
        <StartupCardSpecialist
          key={startup_data.id} 
          {...startup_data}
         
        />
      ))}
      </div>
    </div>
  );
};

export default HomePage;

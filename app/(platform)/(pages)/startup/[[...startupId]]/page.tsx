"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Startup } from "@/app/components/types/startup";
import { Button, IconButton, ProjectState } from "@/app/components/ui";
import {
  Account,
  CurrencyRuble,
  Favourite,
  NotFavourite,
} from "@/app/components/icons";
import Link from "next/link";

const cur_startup = {
  id: 1,
  title: "AI-Powered Personalized Education Platform",
  industry: "EdTech",
  description:
    "A platform that uses AI to tailor learning paths for each student, providing personalized content and feedback.",
  stage: "expectation",
  investment_needed: "500,000",
  founder: "Alice Johnson",
  id_founder: 1211,
  required_specialists: [
    {
      id: 101,
      profession: "Machine Learning Engineer",
      skills: ["Python", "TensorFlow", "NLP"],
      specialist: true,
    },
    {
      id: 102,
      profession: "Frontend Developer",
      skills: ["React", "JavaScript", "HTML/CSS"],
      specialist: true,
    },
    {
      id: 103,
      profession: "Educational Content Creator",
      skills: ["Curriculum Design", "Pedagogy"],
      specialist: false,
    },
  ],
  is_favorited: true,
};

const StartupPage = () => {
  const { startupId } = useParams();
  const [startup, setStartup] = useState<Startup>(cur_startup);
  {
    /*
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStartup = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/startup/${startupId}`); 
        setStartup(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных стартапа:", error);
        {/*setError(error || "Не удалось загрузить данные стартапа.");
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [startupId]); 

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!startup) {
    return <div>Стартап не найден.</div>;
  }
  */
  }

  return (
    <div className="flex flex-row p-4 gap-x-4">
      <div className="flex flex-col gap-y-4 ">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{startup.title}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {startup.industry}
            </p>
          </div>
          {/* onClick={handleFavoriteClick} */}
          <IconButton variant="secondary" size="s">
            {startup.is_favorited ? (
              <Favourite size={24} />
            ) : (
              <NotFavourite size={24} />
            )}
          </IconButton>
        </div>
        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-h5 font-medium">Описание</h2>
          <p className="text-h5 text-base-500"> {startup.description}</p>
        </div>

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <div className="flex flex-row gap-x-2">
            <h2 className="text-h5 font-medium">Текущая стадия:</h2>
            <ProjectState size={20} state={startup.stage} />
          </div>

          <div className="flex flex-row gap-x-2">
            <h2 className="text-h5 font-medium">Необходимые инвестиции:</h2>
            <div className="flex flex-row">
              <span className="text-body-m text-base-600">
                {startup.investment_needed}
              </span>

              <CurrencyRuble color="var(--color-base-700)" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-h5 font-medium">Специалисты:</h2>
          <ul className=" ">
            {startup.required_specialists &&
              startup.required_specialists.map((specialist) => (
                <li
                  className="flex flex-row my-2 py-2 border-b-2 border-base-50 items-center "
                  key={specialist.id}
                >
                  <span className="px-6 h-fit mr-2">
                    {" "}
                    {specialist.profession}
                  </span>
                  <span className="mr-2">Скиллы:</span>
                  <div className="flex flex-row gap-2 ">
                    {specialist.skills?.map((skill) => (
                      <Link
                        key={`${specialist.id}-${skill}`} // Уникальный ключ
                        href={`/search/specialists?skill=${skill}`} // Передача скилла в query params
                        aria-label={`Поиск специалистов с навыком ${skill}`}
                      >
                        <Button color="light-grey" size="s" key={skill}>
                          {skill}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        {startup.image ? (
          <img
            src={startup.image}
            alt={startup.title}
            className="w-[248px] h-[218px] object-cover "
          />
        ) : (
          <img
            src={"/Startup.png"}
            className="w-[248px] h-[218px] object-cover "
          />
        )}
        <Link
          key={startup.founder}
          href={`/messages/${startup.id_founder}`}
          className="w-full"
        >
          <Button className="w-full">Написать</Button>
        </Link>

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-body-m font-medium">Руководитель:</h2>
          <div className="flex flex-row gap-2 items-center">
            <Account size={16} color="var(--color-prime-500)" />{" "}
            {startup.founder}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupPage;

"use client";
import React, { use, useEffect, useState } from "react";
import {
  Invitation,
  RequiredSpecialist,
  StartupCardType,
} from "@/app/types/startup";
import {
  Avatar,
  Button,
  ErrorMessage,
  Header,
  IconButton,
  Label,
  ProjectState,
} from "@/app/components/ui";
import { Account, CurrencyRuble, Edit } from "@/app/components/icons";
import { api, authenticatedRequest } from "@/app/utils/api";
import Loading from "@/app/components/ui/custom/loading";
import FavoriteButton from "@/app/components/ui/button/favorite_button";
import { useAuth } from "@/app/context/auth_context";
import SkillsList from "@/app/components/cards/show/skills";
import ContactInfo from "@/app/components/cards/show/contact_info";
import VacancyForm from "./edit/_components/vacancy_form";
import { Skill } from "@/app/types/skill";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface DropdownOption {
  id: string | number;
  name: string;
}

export default function StartupPage({
  params,
}: {
  params: Promise<{ startup_id: number }>;
}) {
  const { startup_id } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const [startup, setStartup] = useState<StartupCardType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [requiredSpecialists, setRequiredSpecialists] = useState<
    RequiredSpecialist[] | []
  >([]);

  const [professions, setProfessions] = useState<DropdownOption[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [mine, setIsMine] = useState<boolean>();

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFormSubmit = (data: RequiredSpecialist) => {
    setIsLoading(true);
    setRequiredSpecialists((prev) => [...prev, data]);
    console.log(requiredSpecialists);
  };

  useEffect(() => {
    if (startup && mine && requiredSpecialists.length > 0) {
      const updateReqSpec = async () => {
        try {
          const payload = {
            description: startup.description,
            industry_id: startup.industry?.id,
            investment_needed: startup.investment_needed,
            required_specialists: requiredSpecialists.map((specialist) => ({
              profession_id: specialist.profession.id,
              skills_ids: specialist.skills.map((skill) => skill.id),
            })),
            stage: startup.stage,
            title: startup.title,
          };

          console.log(payload);
          const response: AxiosResponse<StartupCardType> =
            await authenticatedRequest<StartupCardType>(
              `/startups/${startup_id}/`,
              "put",
              payload
            );
          if (response.status === 200) {
            setStartup(response.data);
            handleCloseModal();
          }
        } catch (err: any) {
          setError(err?.message || "Ошибка при обновлении опыта.");
          console.log(err.response?.data);
          setIsLoading(false);
        } finally {
          setIsLoading(false);
        }
      };
      updateReqSpec();
    }
  }, [requiredSpecialists]);

  useEffect(() => {
    const fetchStartup = async () => {
      setError(null);

      try {
        const response = await authenticatedRequest<StartupCardType>(
          `/startups/${startup_id}/`,
          "get"
        );
        setStartup(response.data);
        setIsMine(response.data.founder?.user_id === user?.user_id);
        setRequiredSpecialists(response.data.required_specialists || []);
        const prof_list = await api.get<DropdownOption[]>(`/professions/`);
        setProfessions(prof_list.data);

        const skill_list = await api.get<Skill[]>(`/skills/`);
        setSkills(skill_list.data);

        const invits = await authenticatedRequest<Invitation[]>(
          `/invitations/`,
          "get"
        );
        setInvitations(invits.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных стартапа:", error);
        setError("Не удалось загрузить данные стартапа.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartup();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!startup) {
    setError("Стартап не найден");
    return (
      <ErrorMessage
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </ErrorMessage>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </ErrorMessage>
    );
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <Header
          title={startup.title}
          subTitle={startup.industry?.name}
          button={
            mine ? (
              <div
                onClick={() => {
                  router.push(`/startups/${startup_id}/edit`);
                }}
              >
                <IconButton size="s" color="base" variant="tertiary">
                  {<Edit />}
                </IconButton>
              </div>
            ) : (
              <FavoriteButton
                isInitiallyFavorited={startup.is_favorited}
                item={{ startup_id: startup.id }}
              />
            )
          }
        />

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

          {mine && (
            <div>
              <div className="flex flex-row gap-x-2">
                <h2 className="text-h5 font-medium">Просмотры:</h2>
                <div className="flex flex-row">
                  <span className="text-body-m text-base-600">
                    {startup.views}
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-x-2">
                <h2 className="text-h5 font-medium">Добавление в избранное:</h2>
                <div className="flex flex-row">
                  <span className="text-body-m text-base-600">
                    {startup.favorites_count}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-h5 font-medium">Специалисты</h2>
            {mine && (
              <Button variant="tertiary" size="s" onClick={handleOpenModal}>
                Добавить специалиста
              </Button>
            )}
          </div>
          <VacancyForm
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            professions={professions}
            skills={skills}
            className="w-sm "
          />
          <ul>
            {startup.required_specialists ? (
              startup.required_specialists.map((specialist) => (
                <li
                  className="min-h-12 w-full my-2 py-2 border-b-2 border-base-50 "
                  key={specialist.id}
                >
                  {specialist.specialist != null && mine ? (
                    <div className=" flex flex-row w-full justify-between items-center flex-wrap">
                      <span className="px-6 h-fit mr-2">
                        {specialist.specialist.full_name}
                      </span>
                      <div
                        onClick={() => {
                          router.push(
                            `/messages/${specialist.specialist?.user_id}`
                          );
                        }}
                      >
                        <Button size="s">Открыть диалог</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row w-full gap-y-2 items-center ">
                      <span className="px-6 h-fit mr-2">
                        {specialist.profession.name}
                      </span>
                      <SkillsList skills={specialist.skills} />
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-base-500 text-body-s italic">Нет вакансий.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={startup.image} role="startup" />
        {!mine && (
          <div
            key={startup.id}
            onClick={() => {
              router.push(`/messages/${startup.founder?.user_id}`);
            }}
            className="w-full"
          >
            <Button className="w-full">Написать</Button>
          </div>
        )}

        <Label label="Руководитель">
          <div className="flex flex-row gap-2 items-center">
            <Account size={16} color="var(--color-prime-500)" />{" "}
            <div
              onClick={
                mine
                  ? () => {
                      router.push("/profile/me");
                    }
                  : () => {
                      router.push(`/profile/${startup.founder?.user_id}`);
                    }
              }
            >
              {startup.founder?.full_name}
            </div>
          </div>
        </Label>

        <ContactInfo
          contact_phone={startup?.founder?.contact_phone}
          contact_email={startup?.founder?.contact_email}
        />
      </div>
    </div>
  );
}

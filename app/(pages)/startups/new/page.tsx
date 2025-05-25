"use client";

import ImageUploader from "@/app/(pages)/profile/edit/_components/image_uploader";
import ContactInfo from "@/app/components/cards/show/contact_info";
import { Account } from "@/app/components/icons";
import { Button, Input, Label, TextArea } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import Dropdown from "@/app/components/ui/drop-down/dropdown-list";
import { useAuth } from "@/app/context/auth_context";
import { RequiredSpecialist, StartupCardType } from "@/app/types/startup";
import { api, authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skill } from "@/app/types/skill";

interface DropdownOption {
  id: string | number;
  name: string;
}

const stageOptions = [
  { name: "Ожидание", id: "waiting" },
  { name: "В процессе", id: "in_progress" },
  { name: "Запуск", id: "launch" },
  { name: "Анализ результатов", id: "analysis" },
  { name: "Завершен", id: "completed" },
];

export default function StartupCreate() {
  const { user } = useAuth();
  const router = useRouter();

  const [industryOptions, setIndustryOptions] = useState<DropdownOption[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [industry, setIndustry] = useState<DropdownOption | null>(null);
  const [description, setDescription] = useState<string>("");
  const [stage, setStage] = useState<string>();
  const [investmentNeeded, setInvestmentNeeded] = useState<string>("");
  const [requiredSpecialists, setRequiredSpecialists] = useState<
    RequiredSpecialist[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const list: AxiosResponse<{ id: number; name: string }[]> =
          await api.get("/industries/");
        if (list.data) {
          setIndustryOptions(list.data);
        }

        const skill_list: AxiosResponse<{ id: number; name: string }[]> =
          await api.get("/skills/");
        if (skill_list.data) {
          setAllSkills(skill_list.data);
        }
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    setIsLoading(true);
    const payload = {
      title,
      image: image || undefined,
      industry_id: industry?.id,
      description,
      stage,
      investment_needed: investmentNeeded,
      required_specialists: [],
    };

    try {
      const response: AxiosResponse<{ id: number }> =
        await authenticatedRequest("/startups/", "post", payload);
        
      router.push(`/startups/${response.data.id}`);
    } catch (err: any) {
      console.log(err.response.data)
      alert("Ошибка при создании: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustryChange = (option: DropdownOption | null) => {
    setIndustry(option);
    setIsChanged(true);
  };

  const handleStageChange = (option: DropdownOption | null) => {
    if (option) {
      setStage(option.id.toString());
    } else {
      setStage("");
    }
    setIsChanged(true);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setIsChanged(true);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setIsChanged(true);
  };

  const handleInvestmentChange = (value: string) => {
    setInvestmentNeeded(value);
    setIsChanged(true);
  };

  const handleImageChange = (value: string | null) => {
    setImage(value);
    setIsChanged(true);
  };

  const handleReqSpecChange = (value: RequiredSpecialist[]) => {
    setRequiredSpecialists(value);
    setIsChanged(true);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user || user.role != "startup") {
    router.replace("/not-found");
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-end">
        <Button
          size="s"
          onClick={handleCreate}
          disabled={!isChanged || isLoading}
        >
          Сохранить
        </Button>
        <Button
          size="s"
          variant="tertiary"
          color="base"
          onClick={() => router.back()}
        >
          Отменить
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-x-4">
        <div className="flex flex-col gap-y-4 col-span-4">
          <div className="flex flex-row space-x-2 w-2/3">
            <Input
              id="title"
              label="Название"
              placeholder="Введите название"
              value={title}
              onChange={handleTitleChange}
            />
            <div className="w-1/2">
              <Dropdown
                id="industry"
                label="Индустрия"
                options={industryOptions}
                value={industry?.id}
                onChange={handleIndustryChange}
              />
            </div>
          </div>
          <TextArea
            id="description"
            name="description"
            label="Описание"
            placeholder="Расскажите о стартапе"
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="bg-base-0 p-4 rounded-[16px] flex flex-col space-y-2">
            <div className="flex flex-row gap-x-2 items-center">
              <h2 className="text-h5 font-medium text-base-900">
                Текущая стадия:
              </h2>
              <Dropdown
                id="stage"
                options={stageOptions}
                value={stage}
                onChange={handleStageChange}
              />
            </div>
            <div className="flex flex-row gap-x-2 items-center">
              <h2 className="text-h5 font-medium text-base-900">
                Необходимые инвестиции:
              </h2>
              <Input
                id="investment_needed"
                placeholder="0"
                value={investmentNeeded}
                onChange={handleInvestmentChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 col-span-1">
          <ImageUploader
            avatar={image || "/default-startup.png"}
            onChange={handleImageChange}
            defaultUrl={"/default-startup.png"}
          />
          <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2">
            <h2 className="text-body-m font-medium">Руководитель:</h2>
            <div className="flex flex-row gap-2 items-center">
              <Account size={16} color="var(--color-prime-500)" />{" "}
              {user.full_name}
            </div>
          </div>
          <ContactInfo
            contact_phone={user.contact_phone}
            contact_email={user.contact_email}
          />
        </div>
      </div>
    </div>
  );
}

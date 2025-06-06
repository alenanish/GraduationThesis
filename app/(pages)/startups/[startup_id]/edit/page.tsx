"use client";

import ImageUploader from "@/app/(pages)/profile/edit/_components/image_uploader";
import ContactInfo from "@/app/components/cards/show/contact_info";
import { Account } from "@/app/components/icons";
import {
  Button,
  ErrorMessage,
  Input,
  Label,
  TextArea,
} from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import Dropdown from "@/app/components/ui/drop-down/dropdown-list";
import { useAuth } from "@/app/context/auth_context";
import { RequiredSpecialist, StartupCardType } from "@/app/types/startup";
import { api, authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import RequiredSpecialistDel from "./_components/edit_required_spec_list";
import { Skill } from "@/app/types/skill";
import ConfirmAction from "@/app/components/ui/button/confirm_deletion";

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

interface StartupPageEditProps {
  params: Promise<{ startup_id: number }>;
}

export default function StartupPageEdit({ params }: StartupPageEditProps) {
  const { startup_id } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const [startup, setStartup] = useState<StartupCardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [industryOptions, setIndustryOptions] = useState<DropdownOption[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [industryError, setIndustryError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [stageError, setStageError] = useState<string | null>(null);
  const [investmentNeededError, setInvestmentNeededError] = useState<
    string | null
  >(null);

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [industry, setIndustry] = useState<DropdownOption | null>(null);
  const [description, setDescription] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [investmentNeeded, setInvestmentNeeded] = useState<string>("");
  const [requiredSpecialists, setRequiredSpecialists] = useState<
    RequiredSpecialist[]
  >([]);

  const [isChanged, setIsChanged] = useState(false);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await authenticatedRequest(`/startups/${startup_id}/`, "delete");
    setIsModalOpen(false);
    router.replace("/my_startups");
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response: AxiosResponse<StartupCardType> =
          await authenticatedRequest(`/startups/${startup_id}/`, "get");
        if (response.data) {
          const data = response.data;
          setStartup(data);
          setTitle(data.title);
          setImage(data.image || null);
          setIndustry(data.industry || null);
          setDescription(data.description);
          setStage(data.stage);
          setInvestmentNeeded(data.investment_needed);
          setRequiredSpecialists(data.required_specialists || []);
          setIsChanged(false);
        }
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

  useEffect(() => {
    let isValid = true;

    if (title && title === "") {
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (investmentNeeded && investmentNeeded === "") {
      isValid = false;
    } else {
      setInvestmentNeededError(null);
    }

    if (description && description === "") {
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    if (!industry) {
      isValid = false;
    }

    if (!stage) {
      isValid = false;
    }

    setIsSaveButtonActive(isValid);
  }, [title, description, investmentNeeded, industry, stage]);

  const handleSave = async () => {
    const payload = {
      title,
      image: image || undefined,
      industry_id: industry?.id,
      description,
      stage,
      investment_needed: investmentNeeded,
      required_specialists: requiredSpecialists
        ? requiredSpecialists.map((specialist) => ({
            profession_id: specialist.profession.id,
            skills_ids: specialist.skills.map((skill) => skill.id),
          }))
        : [],
    };
    try {
      await authenticatedRequest(`/startups/${startup?.id}/`, "put", payload);
      router.push(`/startups/${startup?.id}`);
    } catch (err: any) {
      setError("Ошибка при сохранении.");
      const errors = err.response.data;
      setTitleError(errors.title);
      setDescriptionError(errors.description);
      setIndustryError(errors.industry_id);
      setStageError(errors.stage);
      setInvestmentNeededError(errors.investment_needed);
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
  if (startup && startup?.founder?.user_id !== user?.user_id) {
    router.replace("/not-found");
    return null;
  }

  return (
    <>
      {error && (
        <ErrorMessage
          onClose={() => {
            setError(null);
          }}
        >
          {error}{" "}
        </ErrorMessage>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-end">
          <Button
            size="s"
            onClick={handleSave}
            disabled={!isSaveButtonActive || !isChanged || isLoading}
          >
            {isLoading ? "Сохраняем..." : "Сохранить"}
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
                required
                id="title"
                label="Название"
                placeholder="Введите название"
                value={title}
                onChange={handleTitleChange}
                errorText={titleError}
              />
              <div className="w-1/2">
                <Dropdown
                  required
                  id="industry"
                  label="Индустрия"
                  options={industryOptions}
                  value={industry?.id}
                  onChange={handleIndustryChange}
                  errorText={industryError}
                />
              </div>
            </div>
            <TextArea
              required
              id="description"
              name="description"
              label="Описание"
              placeholder="Расскажите о стартапе"
              value={description}
              onChange={handleDescriptionChange}
              errorText={descriptionError}
            />
            <div className="bg-base-0 p-4 rounded-[16px] flex flex-col space-y-2">
              <div className="flex flex-row gap-x-2 items-center">
                <h2 className="text-h5 font-medium text-base-900">
                  Текущая стадия
                  <span
                    className="text-red-600 ml-0.5"
                    title="Обязательное поле"
                    aria-label="Обязательное поле."
                  >
                    *
                  </span>
                  :
                </h2>
                <Dropdown
                  id="stage"
                  options={stageOptions}
                  value={stage}
                  onChange={handleStageChange}
                  errorText={stageError}
                />
              </div>
              <div className="flex flex-row gap-x-2 items-center">
                <h2 className="text-h5 font-medium text-base-900">
                  Необходимые инвестиции
                  <span
                    className="text-red-600 ml-0.5"
                    title="Обязательное поле"
                    aria-label="Обязательное поле."
                  >
                    *
                  </span>
                  :
                </h2>
                <Input
                  id="investment_needed"
                  placeholder="0"
                  value={investmentNeeded}
                  onChange={handleInvestmentChange}
                  errorText={investmentNeededError}
                />
              </div>
            </div>
            <Label label="Специалисты:">
              <RequiredSpecialistDel
                allSkills={allSkills}
                initialSpecialists={startup?.required_specialists || []}
                isMine={true}
                onChange={handleReqSpecChange}
              />
            </Label>
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
                {startup?.founder?.full_name}
              </div>
            </div>
            <ContactInfo
              contact_phone={startup?.founder?.contact_phone}
              contact_email={startup?.founder?.contact_email}
            />
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="tertiary"
              color="red"
              size="m"
            >
              Удалить стартап
            </Button>
            <ConfirmAction
              isOpen={isModalOpen}
              onConfirm={handleDelete}
              onCancel={() => setIsModalOpen(false)}
              message="Вы уверены, что хотите удалить этот элемент?"
            />
          </div>
        </div>
      </div>
    </>
  );
}

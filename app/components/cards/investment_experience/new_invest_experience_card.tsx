"use client";

import React, { useState } from "react";
import { Button, DropdownList, ErrorMessage, Input, TextArea } from "../../ui";
import Loading from "../../ui/custom/loading";
import SuccessNotification from "../../ui/text/success-notification";
import { InvestorExperienceType } from "@/app/types/investor";
import { Industry } from "@/app/types/industry";

interface NewInvestExperienceCardProps {
  onAddExperience: (experience: InvestorExperienceType) => void;
  industries: Industry[];
}

interface DropdownOption {
  id: number | string;
  name: string;
}

const NewInvestExperienceCard: React.FC<NewInvestExperienceCardProps> = ({
  onAddExperience,
  industries,
}) => {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [industry, setIndustry] = useState<Industry>();
  const [description, setDescription] = useState<string>("");
  const [stage, setStage] = useState<DropdownOption | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDropdownChange = (option: DropdownOption) => {
    setIndustry({ id: Number(option.id), name: option.name });
  };

  const handleStageChange = (stage: DropdownOption) => {
    setStage(stage);
  };

  const options = [
    { name: "Ожидание", id: "waiting" },
    { name: "В процессе", id: "in_progress" },
    { name: "Запуск", id: "launch" },
    { name: "Анализ результатов", id: "analysis" },
    { name: "Завершён", id: "completed" },
  ];

  const handleClear = () => {
    setTitle("");
    setDate("");
    setIndustry(undefined);
    setDescription("");
    setStage(null);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const isFilled = title && date && industry && description && stage !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    if (!isFilled) {
        setError('Заполните все обязательные поля');
        setIsLoading(false);
        return
    }

    try {
      const newExperience = {
        title: title,
        date: formatDate(date),
        industry: {id: Number(industry.id), name: industry.name},
        description: description,
        stage: stage.id.toString(),
      };

      onAddExperience(newExperience);
      setSuccessMessage("Успешно добавлено!");
    } catch (error: any) {
      setError(error?.message || "Ошибка при добавлении опыта работы.");
    } finally {
      setIsLoading(false);
      handleClear();
    }
  };

  if (error && !isLoading) {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form
      className="w-full  flex flex-col justify-start bg-base-0  pb-4 border-b-4 border-base-100"
      onSubmit={handleSubmit}
    >
      {successMessage && (
        <SuccessNotification
          onClose={() => {
            setSuccessMessage("");
          }}
        >
          {successMessage}
        </SuccessNotification>
      )}
      <div className="flex flex-row gap-x-2 ">
        <Input
          required
          id="title"
          name="title"
          size="m"
          placeholder="Название"
          label="Название"
          value={title}
          onChange={setTitle}
        />
        <DropdownList
          id="industry"
          label="Сфера"
          placeholder="Сфера"
          options={industries}
          value={industry?.id}
          onChange={handleDropdownChange}
        />
        <Input
          required
          id="date"
          name="date"
          size="m"
          placeholder="Дата"
          label="Дата"
          value={date}
          onChange={setDate}
          type="date"
        />
        <DropdownList
          id="stage"
          label="Стадия"
          placeholder="Стадия"
          options={options}
          value={stage?.id}
          onChange={handleStageChange}
        />
      </div>
      <TextArea
        required
        id="description"
        name="description"
        label="Описание"
        placeholder="Описание"
        value={description}
        onChange={setDescription}
        rows={2}
      />
      <div className="flex flex-row gap-x-2 justify-end mt-2">
        <Button
          size="s"
          variant="tertiary"
          color="base"
          disabled={!isFilled}
          onClick={handleClear}
        >
          Очистить
        </Button>
        <Button
          size="s"
          variant="primary"
          color="prime"
          disabled={!isFilled}
          type="submit"
        >
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default NewInvestExperienceCard;

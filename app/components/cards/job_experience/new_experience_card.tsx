"use client";
import { Experience } from "@/app/types/experience";
import React, { useState } from "react";
import { Button, ErrorMessage, Input, TextArea } from "../../ui";
import Loading from "../../ui/custom/loading";
import SuccessNotification from "../../ui/text/success-notification";

interface NewExperienceCardProps {
  onAddExperience: (experience: Experience) => void;
}

const NewExperienceCard: React.FC<NewExperienceCardProps> = ({
  onAddExperience,
}) => {
  const [position, setPosition] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFilled = position && startDate && organization && description;

  const handleClear = () => {
    setPosition("");
    setStartDate("");
    setEndDate("");
    setOrganization("");
    setDescription("");
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newExperience = {
      position: position,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      organization: organization,
      description: description,
    };
    onAddExperience(newExperience);
    setSuccessMessage("Успешно добавлено!");
    try {
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
          id="organization"
          name="organization"
          size="m"
          placeholder="Название организации"
          label="Название организации"
          value={organization}
          onChange={setOrganization}
        />
        <Input
          required
          id="position"
          name="position"
          size="m"
          placeholder="Должность"
          label="Должность"
          value={position}
          onChange={setPosition}
        />
        <Input
          required
          id="startDate"
          name="startDate"
          size="m"
          placeholder="Дата начала"
          label="Дата начала"
          value={startDate}
          onChange={setStartDate}
          type="date"
        />
        <Input
          id="endDate"
          name="endDate"
          size="m"
          placeholder="Дата окончания"
          label="Дата окончания"
          value={endDate}
          onChange={setEndDate}
          type="date"
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

export default NewExperienceCard;

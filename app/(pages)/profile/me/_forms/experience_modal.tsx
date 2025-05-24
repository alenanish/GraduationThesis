"use client";
import React, { useState } from "react";

import Modal from "@/app/components/ui/custom/modal";
import { Button, Input, TextArea } from "@/app/components/ui";
import { Experience } from "@/app/types/experience";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  saveChanges: (experience: Experience) => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({
  isOpen,
  onClose,  
  title = "Добавить опыт",
  saveChanges,
}) => {
  const [organization, setOrganization] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isFilled =
    position != "" &&
    startDate != "" &&
    organization != "" &&
    description != "";

  const handleClear = () => {
    setPosition("");
    setStartDate("");
    setEndDate("");
    setOrganization("");
    setDescription("");
  };

  const handleCancel = () => {
    handleClear();
    onClose();
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = () => {
    const newExperience: Experience = {
      position: position,
      start_date: formatDate(startDate),
      end_date: formatDate(endDate),
      organization: organization,
      description: description,
    };
    handleClear;
    saveChanges(newExperience);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={title}>
      <form onSubmit={handleSubmit} className="space-2">
        <div className="flex flex-row space-x-2">
          <Input
            id="organization"
            name="organization"
            label="Организация"
            placeholder="Организация"
            value={organization}
            onChange={setOrganization}
          />

          <Input
            id="position"
            name="position"
            label="Должность"
            placeholder="Должность"
            value={position}
            onChange={setPosition}
          />
        </div>

        <div className="flex flex-row w-1/2 space-x-2">
          <Input
            id="start_date"
            name="start_date"
            label="Начало"
            type="date"
            placeholder="Начало"
            value={startDate}
            onChange={setStartDate}
          />

          <Input
            id="end_date"
            name="end_date"
            label="Конец"
            type="date"
            placeholder="Конец"
            value={endDate}
            onChange={setEndDate}
          />
        </div>

        <TextArea
          id="description"
          name="description"
          label="Описание"
          placeholder="Описание"
          value={description}
          onChange={setDescription}
        />

        <div className="flex w-full flex-row gap-x-2 justify-end mt-2">
          <Button
            size="s"
            variant="tertiary"
            color="base"
            onClick={handleCancel}
            type="button"
            className="w-full"
          >
            Отменить
          </Button>
          <Button
            size="s"
            variant="primary"
            color="prime"
            disabled={!isFilled}
            type="submit"
            className="w-full"
          >
            Добавить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal;

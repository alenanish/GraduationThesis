"use client";
import React, { useEffect, useState } from "react";

import Modal from "@/app/components/ui/custom/modal";
import { Button, Input, RadioGroup, TextArea } from "@/app/components/ui";
import { InvestorExperienceType } from "@/app/types/investor";

interface InvestExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  saveChanges: (experience: InvestorExperienceType) => void;
}

const stages = [
  { label: "Ожидание", value: "waiting" },
  { label: "В процессе", value: "in_progress" },
  { label: "Запуск", value: "launch" },
  { label: "Анализ результатов", value: "analysis" },
  { label: "Завершен", value: "completed" },
];

const InvestExperienceModal: React.FC<InvestExperienceModalProps> = ({
  isOpen,
  onClose,
  modalTitle = "Добавить опыт",
  saveChanges,
}) => {
  const [title, setTitle] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  const isFilled =
    industry != null && stage != "" && title != "" && description != "";

  const handleClear = () => {
    setIndustry("");
    setStage("");
    setDate("");
    setTitle("");
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
    const newExperience = {
      title: title,
      industry: industry,
      stage: stage,
      date: formatDate(date),
      description: description,
    };
    handleClear;
    saveChanges(newExperience);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title={modalTitle}>
      <form onSubmit={handleSubmit} className="space-2">
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col w-2/3">
            <Input
              id="title"
              name="title"
              label="Название"
              placeholder="Название"
              value={title}
              onChange={setTitle}
            />

            <div className="flex flex-row space-x-2">
              <Input
                id="industry"
                name="industry"
                label="Сфера"
                placeholder="Сфера"
                value={industry}
                onChange={setIndustry}
              />
              <Input
                id="date"
                name="date"
                label="Дата"
                type="date"
                placeholder="Дата"
                value={date}
                onChange={setDate}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <h3>Стадия</h3>
            <RadioGroup
              options={stages}
              onChange={setStage}
              value={stage}
              className="space-y-2 w-fit"
            />
          </div>
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

export default InvestExperienceModal;

"use client";

import { Button, DropdownList } from "@/app/components/ui";
import { useState, useCallback } from "react";
import CheckboxGroup from "@/app/components/ui/input/search_checkbox";

interface DropdownOption {
  id: string | number;
  name: string;
}

interface SearchFiltersProps {
  industries: DropdownOption[];
  professions: DropdownOption[];
  skills: { name: string; id: string }[];
  onSearch: (filters: {
    industry_id: number | null;
    stage: string | null;
    required_profession: string | null;
    required_skills: string[] | null;
  }) => void;
}

const options = [
  { name: "Ожидание", id: "waiting" },
  { name: "В процессе", id: "in_progress" },
  { name: "Запуск", id: "launch" },
  { name: "Анализ результатов", id: "analysis" },
  { name: "Завершен", id: "completed" },
];

const ForSpecSearchFilters: React.FC<SearchFiltersProps> = ({
  industries,
  professions,
  skills,
  onSearch,
}) => {
  const [stage, setStage] = useState<DropdownOption | null>(null);
  const [industry, setIndustry] = useState<DropdownOption | null>(null);
  const [required_profession, setRequiredProfession] =
    useState<DropdownOption | null>(null);
  const [required_skills, setRequiredSkills] = useState<string[]>([]);

  const handleCheckboxChange = (newSelectedValues: string[]) => {
    setRequiredSkills(newSelectedValues);
  };

  const handleIndustryChange = useCallback((option: DropdownOption | null) => {
    setIndustry(option);
  }, []);

  const handleProfessionChange = useCallback(
    (option: DropdownOption | null) => {
      setRequiredProfession(option);
    },
    []
  );

  const handleStageChange = useCallback((option: DropdownOption | null) => {
    setStage(option);
  }, []);

  const handleSearch = useCallback(() => {
    const filters = {
      industry_id: industry ? Number(industry.id) : null,
      stage: stage ? stage.id.toString() : null,
      required_skills: required_skills.length > 0 ? required_skills : null,
      required_profession: required_profession
        ? required_profession.id.toString()
        : null,
    };
    onSearch(filters);
  }, [industry, stage, required_profession, required_skills, onSearch]);

  return (
    <div className="fixed w-1/4 bg-base-0 flex flex-col gap-y-2 p-4 rounded-[16px] h-[calc(100vh-118px)] flex-grow gap-1 ">
      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Сфера:</h2>
        <DropdownList
          id="industry"
          placeholder="Сфера"
          options={industries}
          value={industry?.id}
          onChange={handleIndustryChange}
        />
      </div>
      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Профессия:</h2>
        <DropdownList
          id="profession"
          placeholder="Профессия"
          options={professions}
          value={required_profession?.id}
          onChange={handleProfessionChange}
        />
      </div>

      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Стадии:</h2>
        <DropdownList
          id="stage"
          placeholder="Стадии"
          options={options}
          value={stage?.id}
          onChange={handleStageChange}
        />
      </div>
      <h2 className="text-body-m font-medium text-base-800">Навыки:</h2>
      <CheckboxGroup
        options={skills}
        selectedValues={required_skills}
        onChange={handleCheckboxChange}
        placeholder="Навыки"
      />

      <Button onClick={handleSearch}>Найти</Button>
    </div>
  );
};

export default ForSpecSearchFilters;

"use client";

import { Button, DropdownList, Input } from "@/app/components/ui";
import { useState, useCallback } from "react";
import CheckboxGroup from "@/app/components/ui/input/search_checkbox";

interface DropdownOption {
  id: string | number;
  name: string;
}

interface SearchFiltersProps {
  professions: DropdownOption[];
  skills: { name: string; id: string }[];
  onSearch: (filters: {
    min_experience_years: string | null;
    profession: string | null;
    skills: string[] | null;
  }) => void;
}

const SpecSearchFilters: React.FC<SearchFiltersProps> = ({
  professions,
  skills,
  onSearch,
}) => {
  const [experience, setExperience] = useState<string | null>(null);
  const [profession, setProfession] = useState<DropdownOption | null>(null);
  const [required_skills, setRequiredSkills] = useState<string[]>([]);

  const handleCheckboxChange = (newSelectedValues: string[]) => {
    setRequiredSkills(newSelectedValues);
  };

  const handleProfessionChange = useCallback(
    (option: DropdownOption | null) => {
      setProfession(option);
    },
    []
  );

  const handleSearch = useCallback(() => {
    const filters = {
      profession: profession ? profession.id.toString() : null,
      skills: required_skills.length > 0 ? required_skills : null,
      min_experience_years: experience ? experience.toString() : "0",
    };
    onSearch(filters);
  }, [profession, skills, experience, onSearch]);

  return (
    <div className="fixed w-1/4 bg-base-0 flex flex-col gap-y-2 p-4 rounded-[16px] h-[calc(100vh-118px)] flex-grow gap-1 ">
      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Профессия:</h2>
        <DropdownList
          id="profession"
          placeholder="Профессия"
          options={professions}
          value={profession?.id}
          onChange={handleProfessionChange}
        />
      </div>

      <h2 className="text-body-m font-medium text-base-800">Навыки:</h2>
      <CheckboxGroup
        options={skills}
        selectedValues={required_skills}
        onChange={handleCheckboxChange}
        placeholder="Навыки"
      />

      <h2 className="text-body-m font-medium text-base-800 mb-1">Опыт:</h2>

      <Input
        size="s"
        id="experience"
        name="experience"
        label="Сумарный опыт"
        placeholder="Сумарный опыт"
        type="number"
        value={experience?.toString() || "0"}
        onChange={setExperience}
      />

      <Button onClick={handleSearch}>Найти</Button>
    </div>
  );
};

export default SpecSearchFilters;

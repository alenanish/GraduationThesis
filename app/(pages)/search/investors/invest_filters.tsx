"use client";

import { CurrencyRuble } from "@/app/components/icons";
import {
  Button,
  CheckboxGroup,
  DropdownList,
  Input,
} from "@/app/components/ui";
import { useState, useCallback } from "react";

const options = [
  { name: "Ожидание", id: "waiting" },
  { name: "В процессе", id: "in_progress" },
  { name: "Запуск", id: "launch" },
  { name: "Анализ результатов", id: "analysis" },
  { name: "Завершен", id: "completed" },
];

interface DropdownOption {
  id: string | number;
  name: string;
}


interface SearchFiltersProps {
  industries: DropdownOption[];
  onSearch: (filters: {
    industry_id: number | null;
    preferred_stages: string[];
    investment_min: string | null;
    investment_max: string | null;
  }) => void;
}

const InvestSearchFilters: React.FC<SearchFiltersProps> = ({
  industries,
  onSearch,
}) => {
  const [preferred_stages, setStages] = useState<string[]>([]);
  const [industry, setIndustry] = useState<DropdownOption | null>(null);
  const [investment_min, setInvestmentMin] = useState<string | null>(null);
  const [investment_max, setInvestmentMax] = useState<string | null>(null);

  const handleChangeStages = useCallback((selectedValues: string[]) => {
    setStages(selectedValues);
  }, []);

  const handleIndystryChange = useCallback((option: DropdownOption | null) => {
    setIndustry(option);
  }, []);

  const handleSearch = useCallback(() => {
    const filters = {
      industry_id: industry ? Number(industry.id) : null,
      preferred_stages: preferred_stages,
      investment_min: investment_min,
      investment_max: investment_max,
    };
    onSearch(filters);
  }, [industry, preferred_stages, investment_min, investment_max, onSearch]);

  return (
    <div className="fixed w-1/4 bg-base-0 flex flex-col gap-y-2 p-4 rounded-[16px] h-[calc(100vh-118px)] flex-grow gap-1 ">
      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Сфера:</h2>
        <DropdownList
          id="industry"
          placeholder="Сфера"
          options={industries}
          value={industry?.id}
          onChange={handleIndystryChange}
        />
      </div>
      <div className="mb-3">
        <h2 className="text-body-m font-medium text-base-800">Стадии:</h2>
        <CheckboxGroup
          options={options}
          selectedValues={preferred_stages}
          onChange={handleChangeStages}
        />
      </div>
      <div>
        <h2 className="text-body-m font-medium text-base-800 mb-1">
          Размер инвестиций:
        </h2>

        <Input
          size="s"
          id="investment_min"
          name="investment_min"
          label="Минимум"
          placeholder="Минимум"
          type="number"
          value={investment_min || ""}
          onChange={setInvestmentMin}
          rightIcon={<CurrencyRuble size={16} />}
        />
        <Input
          size="s"
          id="investment_max"
          name="investment_max"
          label="Максимум"
          type="number"
          placeholder="Максимум"
          value={investment_max || ""}
          onChange={setInvestmentMax}
          rightIcon={<CurrencyRuble size={16} />}
        />
      </div>
      <Button onClick={handleSearch}>Найти</Button>
    </div>
  );
};

export default InvestSearchFilters;

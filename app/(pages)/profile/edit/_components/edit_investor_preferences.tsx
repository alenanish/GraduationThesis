import { CurrencyRuble } from "@/app/components/icons";
import { CheckboxGroup, Input } from "@/app/components/ui";

interface InvestorPreferencesProps {
  preferred_stages: string[];
  setStages: (stage: string[] | []) => void;
  investment_min?: string | null;
  setInvestmentMin: (investment_min: string) => void;
  investment_max?: string | null;
  setInvestmentMax: (investment_max: string) => void;
}

const EditInvestorPreferences: React.FC<InvestorPreferencesProps> = ({
  preferred_stages,
  setStages,
  investment_min,
  setInvestmentMin,
  investment_max,
  setInvestmentMax,
}) => {
  const options = [
    { name: "Ожидание", id: "waiting" },
    { name: "В процессе", id: "in_progress" },
    { name: "Запуск", id: "launch" },
    { name: "Анализ результатов", id: "analysis" },
    { name: "Завершен", id: "completed" },
  ];

  return (
    <div className="bg-base-0 flex flex-col gap-y-2 p-4 rounded-[16px]">
      <h2 className="text-h5 font-medium text-base-900">
        Предпочитаемые стадии для инвестирования:
      </h2>
      <CheckboxGroup
        options={options}
        selectedValues={preferred_stages}
        onChange={setStages}
      />

      <h2 className="text-h5 font-medium text-base-900">Размер инвестиций:</h2>
      <div className="flex flex-row">
        <div className="flex flex-row h-20 gap-x-4 w-1/2 items-center ">
          <Input
            size="s"
            id="investment_min"
            name="investment_min"
            label="Минимум"
            placeholder="Минимум"
            value={investment_min?.toString()}
            onChange={setInvestmentMin}
            rightIcon={<CurrencyRuble size={16} />}
          />
          <Input
            size="s"
            id="investment_max"
            name="investment_max"
            label="Максимум"
            placeholder="Максимум"
            value={investment_max?.toString()}
            onChange={setInvestmentMax}
            rightIcon={<CurrencyRuble size={16} />}
          />
        </div>
      </div>
    </div>
  );
};

export default EditInvestorPreferences;

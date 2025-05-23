import { CurrencyRuble } from "@/app/components/icons";
import { ProjectState } from "@/app/components/ui";
import Link from "next/link";

interface InvestorPreferencesProps {
  prefered_stages: string[];
  investment_min: string;
  investment_max: string;
}

const InvestorPreferences: React.FC<InvestorPreferencesProps> = ({
  prefered_stages,
  investment_min,
  investment_max,
}) => {
  return (
    <div className="bg-base-0 flex flex-col gap-y-2 p-4 rounded-[16px]">
      <div className='flex flex-row space-x-2'><h2 className="text-h5 font-medium text-base-900">
        Предпочитаемые стадии для инвестирования:
      </h2>
      {prefered_stages.map((stage) => (
          <Link
            id={stage}
            key={stage}
            href="/search/startups/"
            passHref
          >
            <ProjectState state={stage} size={20} />
          </Link>
        ))}
</div>
      
      <div className="flex flex-row gap-x-4 items-center text-body-m text-base-600">
        <h2 className="text-h5 font-medium text-base-900">
          Размер инвестиций:
        </h2>

        <span className="text-body-m text-base-600 flex flex-row items-center">
          {investment_min}{" "}
          <CurrencyRuble size={20} color="var(--color-base-700)" />
        </span>
        <span className="text-h4 text-base-600">-</span>
        <span className="text-body-m text-base-600 flex flex-row items-center">
          {investment_max}{" "}
          <CurrencyRuble size={20} color="var(--color-base-700)" />
        </span>
      </div>
    </div>
  );
};

export default InvestorPreferences;

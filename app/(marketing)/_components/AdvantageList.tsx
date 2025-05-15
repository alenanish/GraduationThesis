import { Plus } from "@/app/components/icons";

interface AdvantageItemProps {
  text: string;
}

function AdvantageItem({ text }: AdvantageItemProps) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Plus size={24} color="var(--color-prime-500)" />
      <p className="flex-wrap text-base-700">{text}</p>
    </div>
  );
}

interface AdvantageListProps {
  advantages: string[];
}

function AdvantageList({ advantages }: AdvantageListProps) {
  return (
    <div>
      {advantages.map((advantage, index) => (
        <AdvantageItem key={index} text={advantage} />
      ))}
    </div>
  );
}

export default AdvantageList;


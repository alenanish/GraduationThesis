"use client";
import { InvestorExperienceType } from "@/app/types/investor";
import InvestExperienceCard from "./invest_experience_card";

interface InvestExperienceProps {
  experiences: InvestorExperienceType[] | [];
  isEdit: boolean;
  onExperiencesChange?: (newExperiences: InvestorExperienceType[]) => void;
}

const InvestExperience: React.FC<InvestExperienceProps> = ({
  experiences,
  isEdit = false,
  onExperiencesChange,
}) => {
  const handleDelete = (index: number) => {
    if (!onExperiencesChange) return;
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    onExperiencesChange(newExperiences);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-2 ">
        {experiences && experiences.length > 0 ? (
          <div>
            <ul>
              {experiences.map(
                (experience: InvestorExperienceType, index: number) => (
                  <InvestExperienceCard
                    onDelete={() => handleDelete(index)}
                    isEdit={isEdit}
                    key={index}
                    {...experience}
                  />
                )
              )}
            </ul>
          </div>
        ) : (
          !isEdit && (
            <p className=" text-body-s italic text-base-400">
              Предыдущие инвестициине указаны.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default InvestExperience;

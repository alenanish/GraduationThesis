"use client";
import { InvestorExperienceType } from "@/app/types/investor";
import InvestExperienceCard from "./invest_experience_card";

interface InvestExperienceProps {
  experiences?: InvestorExperienceType[] | [];
  isEdit: boolean;
}

const InvestExperience: React.FC<InvestExperienceProps> = ({
  experiences,
  isEdit = false,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 ">
        {experiences && experiences.length > 0 ? (
          <div>
            <ul>
              {experiences.map(
                (experience: InvestorExperienceType, index: number) => (
                  <InvestExperienceCard
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
            <p className=" text-body-s italic text-base-400">Опыт не указан.</p>
          )
        )}
      </div>
    </div>
  );
};

export default InvestExperience;

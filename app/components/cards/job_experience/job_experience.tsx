"use client";
import ExperienceCard from "./experience_card";
import { Experience } from "@/app/types/experience";

interface JobExperienceProps {
  experiences: Experience[];
  isEdit: boolean;
  onExperiencesChange?: (newExperiences: Experience[]) => void;
}

const JobExperience: React.FC<JobExperienceProps> = ({
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
              {experiences.map((experience: Experience, index: number) => (
                <ExperienceCard
                  onDelete={() => handleDelete(index)}
                  isEdit={isEdit}
                  key={index}
                  {...experience}
                />
              ))}
            </ul>
          </div>
        ) : (
          <p className=" text-body-s italic text-base-400">
            Опыт работы не указан.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobExperience;

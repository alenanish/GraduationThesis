import NewExperienceCard from "@/app/components/cards/job_experience/new_experience_card";
import { JobExperience } from "@/app/components/ui";
import { Experience } from "@/app/types/experience";

interface ExperienceSectionProps {
  experiences: Experience[];
  setExperiences: (experiences: Experience[]) => void;
}

const EditJobExperience: React.FC<ExperienceSectionProps> = ({
  experiences,
  setExperiences,
}) => {
  const handleExperiencesChange = (newExperience: Experience) => {
    setExperiences([...experiences, newExperience]);
  };

  return (
    <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
      <h2 className="text-h5 font-medium">Опыт работы</h2>
      <NewExperienceCard onAddExperience={handleExperiencesChange} />
      <JobExperience experiences={experiences} isEdit={true} />
    </div>
  );
};

export default EditJobExperience;

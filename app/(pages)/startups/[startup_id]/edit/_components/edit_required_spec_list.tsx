import React, { useState } from "react";
import NewSkillsList from "@/app/(pages)/profile/edit/_components/new_skill";
import { Delete } from "@/app/components/icons";
import { IconButton } from "@/app/components/ui";
import { RequiredSpecialist } from "@/app/types/startup";
import { Skill } from "@/app/types/skill";

interface RequiredSpecialistDelProps {
  initialSpecialists: RequiredSpecialist[];
  isMine: boolean;
  onChange: (value: RequiredSpecialist[]) => void;
  allSkills: Skill[];
}

const RequiredSpecialistDel: React.FC<RequiredSpecialistDelProps> = ({
  initialSpecialists,
  isMine,
  onChange,
  allSkills,
}) => {
  const [specialists, setSpecialists] = useState(initialSpecialists || []);

  const handleRemoveSpecialist = (id?: number) => {
    if (id !== undefined) {
      const updated = specialists.filter((s) => s.id !== id);
      setSpecialists(updated);
      onChange(specialists);
    }
  };

  const handleSkillsChange = (
    id: number | undefined,
    skills: { id: number; name: string }[]
  ) => {
    setSpecialists((prev) =>
      prev.map((s) => (s.id === id ? { ...s, skills } : s))
    );
    onChange(specialists);
  };

  return (
    <ul>
      {specialists.length > 0 ? (
        specialists.map((specialist) => (
          <li
            className="min-h-12 w-full my-2 py-2 border-b-2 border-base-50 "
            key={specialist.id}
          >
            {specialist.specialist != null && isMine ? (
              <div className="flex flex-row w-full justify-between items-center flex-wrap">
                <span className="px-6 h-fit mr-2">
                  {specialist.specialist.full_name}
                </span>
                <IconButton
                  size="s"
                  variant="tertiary"
                  color="base"
                  onClick={() => handleRemoveSpecialist(specialist.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            ) : (
              <div className="flex flex-row w-full gap-y-2 items-center">
                <span className="px-6 h-fit mr-2">
                  {specialist.profession.name}
                </span>

                <NewSkillsList
                allSkills={allSkills}
                  initialSkills={specialist.skills}
                  onSkillsChange={(skills) =>
                    handleSkillsChange(specialist.id, skills)
                  }
                />

                <IconButton
                  size="s"
                  variant="tertiary"
                  color="base"
                  onClick={() => handleRemoveSpecialist(specialist.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            )}
          </li>
        ))
      ) : (
        <p className="text-base-500 text-body-s italic">Нет вакансий.</p>
      )}
    </ul>
  );
};

export default RequiredSpecialistDel;

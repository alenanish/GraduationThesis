"use client";
import { Skill } from "@/app/types/skill";
import React, { useState } from "react";
import { Button } from "../../ui";
import Link from "next/link";

interface SkillsProps {
  skills: Skill[] | [];
  className?: string;
  maxSkillsToShow?: number;
}

const SkillsList: React.FC<SkillsProps> = ({
  skills,
  className = "",
  maxSkillsToShow,
}) => {
  const [numberSkills] = useState<number>(
    maxSkillsToShow ? maxSkillsToShow : skills.length
  );
  const startIndex = Math.max(0, skills.length - numberSkills);
  const displayedSkills = skills.slice(startIndex);
  return (
    <div className="flex flex-row gap-x-4 items-center mt-2">
      <h3 className="text-body-m text-base-900 ">Навыки:</h3>
      <ul className={`${className} flex gap-2`}>
        {displayedSkills.map((skill) => (
          <Link
            id={skill.name}
            key={skill.name}
            href="/search/specialists"
            passHref
          >
            <Button color="light-grey" size="s" key={skill.id}>
              {skill.name}
            </Button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;

"use client";
import { Skill } from "@/app/types/skill";
import React from "react";
import { Button } from "../../ui";
import Link from "next/link";

interface SkillsProps {
  skills: Skill[] | [];
  className?: string;
}

const SkillsList: React.FC<SkillsProps> = ({ skills, className = "" }) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <h3 className="text-body-m text-base-900 ">Навыки:</h3>
      <ul className={`${className} flex gap-2 flex-wrap`}>
        {skills &&
          skills.map((skill) => (
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

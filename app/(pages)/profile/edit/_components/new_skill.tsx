"use client";

import { Add, Close } from "@/app/components/icons";
import { Button, IconButton, Input } from "@/app/components/ui";
import { Skill } from "@/app/types/skill";
import React, { useState, useEffect } from "react";

interface NewSkillsListProps {
  allSkills: Skill[] | [];
  className?: string;
  initialSkills: Skill[] | [];
  onSkillsChange: (skills: Skill[]) => void;
}

const NewSkillsList: React.FC<NewSkillsListProps> = ({
  allSkills = [],
  className = "",
  initialSkills,
  onSkillsChange,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    setSelectedSkills(initialSkills);
  }, []);

  useEffect(() => {
    const filtered = allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSkills(filtered);
  }, [searchTerm]);

  const updateSkills = (skills: Skill[]) => {
    setSelectedSkills(skills);
    if (onSkillsChange) {
      onSkillsChange(skills);
    }
  };

  const handleSelectSkill = (skill: Skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      const newSkills = [...selectedSkills, skill];
      updateSkills(newSkills);
    }
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleRemoveSkill = (skill: Skill) => {
    const newSkills = selectedSkills.filter((s) => s.id !== skill.id);
    updateSkills(newSkills);
  };

  return (
    <div className="min-h-[200px] h-full grow">
      <div className={`flex flex-row ${className}`}>
        <div className="flex flex-row gap-x-4 items-center">
          <h3 className="text-body-m text-base-900 ">Навыки:</h3>

          <div className="flex flex-col space-y-2  ">
            <div className="flex flex-row space-x-2 relative w-2/3 ">
              <IconButton
                onClick={toggleDropdown}
                variant="primary"
                color="light-grey"
                size="s"
                className="flex"
              >
                {!isDropdownOpen ? <Add /> : <Close />}
              </IconButton>
              {isDropdownOpen && (
                <div className="absolute left-14 max-w-1/2 min-w-sm z-50 ">
                  <Input
                    id="search_skill"
                    name="search_skill"
                    type="text"
                    size="m"
                    value={searchTerm}
                    onChange={setSearchTerm}
                    label=""
                    placeholder="Искать навык"
                  />

                  <div className=" max-h-[150px] py-1 overflow-auto rounded-[8px] bg-base-0 mt-1">
                    {filteredSkills && filteredSkills.length > 0 ? (
                      filteredSkills.map((skill) => (
                        <button
                          key={skill.id}
                          onClick={() => handleSelectSkill(skill)}
                          className=" truncate text-base-800 h-[35px] flex flex-row items-center w-full text-left p-2 gap-2 rounded-[8px] text-body-m font-medium hover:bg-prime-100  active:outline-none active:bg-prime-200 active:text-base-900"
                          role="menuitem"
                        >
                          <p className="truncate"> {skill.name} </p>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-gray-500">
                        Нет результатов
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <ul className={`${className} flex gap-2 flex-wrap`}>
              {selectedSkills.map((skill) => (
                <Button
                  color="light-grey"
                  size="s"
                  onClick={() => handleRemoveSkill(skill)}
                  key={skill.id}
                  iconPosition="right"
                  icon={<Close size={16} />}
                >
                  {skill.name}
                </Button>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSkillsList;

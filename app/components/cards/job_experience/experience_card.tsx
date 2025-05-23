"use client";
import { Experience } from "@/app/types/experience";
import React from "react";
import { Calendar, Delete } from "../../icons";
import { IconButton } from "../../ui";

interface ExperienceCardProps extends Experience {
  isEdit: boolean;
  onDelete?: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  organization,
  position,
  start_date,
  end_date,
  description,
  isEdit,
  onDelete,
}) => {

  return (
    <div
      className="w-full h-fit  p-4 
      bg-base-0 mb-4  border-b-2 border-base-100 "
    >
      <div className="flex flex-col gap-y-2 ">
        <div className="flex flex-row gap-x-2 text-caption text-base-500">
          <Calendar size={16} color="var(--color-base-500)" />
          <p>{start_date}</p>
          <p>-</p>
          <p>{end_date}</p>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-x-2 text-body-m text-base-900">
              <p className="font-medium">{organization}</p>
              <p>-</p>
              <p>{position}</p>
            </div>
            {isEdit && (
              <div className="">
                <IconButton
                  aria-label="delete"
                  size="s"
                  variant="tertiary"
                  color="base"
                  onClick={onDelete}
                >
                  <Delete size={20} />
                </IconButton>
              </div>
            )}
          </div>

          <div className=" text-body-s text-base-500 flex-wrap">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

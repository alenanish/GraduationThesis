"use client";
import { Experience } from "@/app/types/experience";
import React from "react";
import { Calendar } from "../../icons";

const ExperienceCard: React.FC<Experience> = ({
  id,
  organization,
  position,
  start_date,
  end_date,
  description,
}) => {
  return (
    <div
      className="w-full h-[250px] flex flex-col gap-y-2 p-4 justify-start
      bg-base-0"
    >
      <div className="flex flex-col gap-x-2 text-caption text-base-500">
        <Calendar size={16} color="var(--color-base-500)" />
        <p>{start_date}</p>
        <p>-</p>
        <p>{end_date}</p>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col gap-x-2 text-body-m text-base-900">
          <p className="font-medium">{organization}</p>
          <p>-</p>
          <p>{position}</p>
        </div>
        <div className=" text-body-s text-base-500 flex-wrap">
          {description}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;

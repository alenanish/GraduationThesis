"use client";
import React from "react";
import { Calendar, Delete } from "../../icons";
import IconButton from "../../ui/button/icon-button";
import { InvestorExperienceType } from "@/app/types/investor";
import ProjectState from "../../ui/custom/project-state";

interface InvestorExperienceProps extends InvestorExperienceType {
  isEdit: boolean;
  onDelete?: () => void;
}

const InvestExperienceCard: React.FC<InvestorExperienceProps> = ({
  id,
  title,
  industry,
  stage,
  date,
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
          <p>{date}</p>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-x-2 text-body-m text-base-900">
              <p className="font-medium">{title}</p>
              <p>-</p>
              <p>{industry}</p>
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
          <ProjectState state={stage} size={20} />

          <div className=" text-body-s text-base-500 flex-wrap">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestExperienceCard;

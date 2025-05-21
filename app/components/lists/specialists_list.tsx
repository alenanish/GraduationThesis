"use client";

import { SpecialistCard } from "@/app/components/ui";
import { SpecialistCardType } from "@/app/types/specialist";
import React from "react";

interface SpecialistsListProps {
  specialists: SpecialistCardType[];
  no_result_text?: string;
}

const SpecialistsList: React.FC<SpecialistsListProps> = ({
  specialists,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {specialists.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {specialists.map((specialist: SpecialistCardType) => (
            <SpecialistCard key={specialist.user_id} {...specialist} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default SpecialistsList;

"use client";

import { StartupCardSpecialist } from "@/app/components/ui";
import { MyStartupType } from "@/app/types/startup";
import React from "react";
import CurStartupSpecCard from "./spec_current_startup_card";

interface StartupsListProps {
  startups: MyStartupType[];
  no_result_text?: string;
  isNew?: boolean;
}

const CurStartupsSpecList: React.FC<StartupsListProps> = ({
  startups,
  no_result_text = "К сожалению, нет результатов",
  isNew = false,
}) => {
  return (
    <>
      {startups.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {startups.map((startup: MyStartupType) => (
            <CurStartupSpecCard key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default CurStartupsSpecList;

"use client";

import { StartupCardSpecialist } from "@/app/components/ui";
import { MyStartupType } from "@/app/types/startup";
import React from "react";
import NewStartupSpecCard from "./spec_new_startup_card";

interface StartupsListProps {
  startups: MyStartupType[];
  no_result_text?: string;
  isNew?: boolean;
}

const NewStartupsSpecList: React.FC<StartupsListProps> = ({
  startups,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {startups.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {startups.map((startup: MyStartupType) => (
            <NewStartupSpecCard key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default NewStartupsSpecList;

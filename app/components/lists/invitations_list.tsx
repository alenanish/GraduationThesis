"use client";

import { StartupCardSpecialist } from "@/app/components/ui";
import { StartupSpecCardType } from "@/app/types/startup";
import React from "react";

interface StartupsListProps {
  startups: StartupSpecCardType[];
  no_result_text?: string;
}

const StartupsSpecList: React.FC<StartupsListProps> = ({
  startups,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {startups.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {startups.map((startup: StartupSpecCardType) => (
            <StartupCardSpecialist key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default StartupsSpecList;

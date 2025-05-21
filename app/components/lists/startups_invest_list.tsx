"use client";

import { StartupInvestCard } from "@/app/components/ui";
import { StartupForInvestmentsCardType } from "@/app/types/startup";
import React from "react";

interface StartupsListProps {
  startups: StartupForInvestmentsCardType[];
  no_result_text?: string;
}

const StartupsInvestList: React.FC<StartupsListProps> = ({
  startups,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {startups.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {startups.map((startup: StartupForInvestmentsCardType) => (
            <StartupInvestCard key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default StartupsInvestList;

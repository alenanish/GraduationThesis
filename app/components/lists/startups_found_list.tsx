"use client";

import { MyStartupType, StartupCardType } from "@/app/types/startup";
import React from "react";
import StartupCardFounder from "../cards/startup_card_founder";

interface StartupsListProps {
  startups: MyStartupType[];
  no_result_text?: string;
}

const StartupsFoundList: React.FC<StartupsListProps> = ({
  startups,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {startups.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {startups.map((startup: MyStartupType) => (
            <StartupCardFounder key={startup.id} startup={startup} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default StartupsFoundList;

"use client";

import { InvestorCard } from "@/app/components/ui";
import { InvestorCardType } from "@/app/types/investor";
import React from "react";

interface InvestorsListProps {
  investors: InvestorCardType[];
  no_result_text?: string;
}

const InvestorsList: React.FC<InvestorsListProps> = ({
  investors,
  no_result_text = "К сожалению, нет результатов",
}) => {
  return (
    <>
      {investors.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {investors.map((investor: InvestorCardType) => (
            <InvestorCard key={investor.user_id} {...investor} />
          ))}
        </ul>
      ) : (
        <p className="text-body-m italic text-base-400">{no_result_text}</p>
      )}
    </>
  );
};

export default InvestorsList;

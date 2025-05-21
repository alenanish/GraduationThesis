"use client";
import React, { useState } from "react";
import { Button } from "../../ui";
import Link from "next/link";
import { Profession } from "@/app/types/profession";

interface RequiredSpecialistsProps {
  required_specislists: Profession[] | [];
  className?: string;
  maxRequiredSpecialistsToShow?: number;
}

const RequiredSpecialistsList: React.FC<RequiredSpecialistsProps> = ({
  required_specislists,
  className = "",
  maxRequiredSpecialistsToShow = 3,
}) => {
  const [numberRequiredSpecialists] = useState<number>(
    maxRequiredSpecialistsToShow
      ? maxRequiredSpecialistsToShow
      : required_specislists.length
  );
  const startIndex = Math.max(
    0,
    required_specislists.length - numberRequiredSpecialists
  );
  const displayedRequiredSpecialists = required_specislists.slice(startIndex);
  return (
    <div className="flex flex-row gap-x-4 items-center mt-2">
      <h3 className="text-body-m text-base-900 ">Требуемые специалисты:</h3>
      <ul className={`${className} flex gap-2`}>
        {displayedRequiredSpecialists.map((profession) => (
          <Link key={profession.id} href="/search/specialists" passHref>
            <Button color="light-grey" size="s" key={profession.id}>
              {profession.name}
            </Button>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RequiredSpecialistsList;

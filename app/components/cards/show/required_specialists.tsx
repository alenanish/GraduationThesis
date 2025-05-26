"use client";
import React, { useState } from "react";
import { Button } from "../../ui";
import { Profession } from "@/app/types/profession";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
          <div key={profession.id} >
            <Button  onClick={()=>{router.push("/search/specialists")}} color="light-grey" size="s" key={profession.id}>
              {profession.name}
            </Button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RequiredSpecialistsList;

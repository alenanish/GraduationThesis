"use client";
import React from "react";
import { Avatar, Button } from "@/app/components/ui";
import Link from "next/link";
import { StartupSpecCardType } from "../../types/startup";
import RequiredSpecialistsList from "./show/required_specialists";
import FavoriteButton from "../ui/button/favorite_button";

const StartupSpecCard: React.FC<StartupSpecCardType> = ({
  id,
  title,
  industry,
  description,
  is_favorited,
  avatar,
  required_specialists,
  id_founder,
}) => {
  
  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <Avatar avatar={avatar} role='startup' />

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <Link key={id} href={`/startup/${id}`} passHref>
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{title}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {industry.name}
            </p>
          </div>
        </Link>
        <div className=" flex-grow">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {description}
          </p>
        </div>

      
        <RequiredSpecialistsList required_specislists={required_specialists} />

        <Link href={`/messages/${id_founder}`} className="w-fit mt-2" passHref>
          <Button>Открыть чат</Button>
        </Link>
      </div>

      <FavoriteButton isInitiallyFavorited={is_favorited} item={{startup_id: id}}/>
    </div>
  );
};

export default StartupSpecCard;

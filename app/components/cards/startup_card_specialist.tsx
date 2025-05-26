"use client";
import React from "react";
import { Avatar, Button } from "@/app/components/ui";
import { StartupSpecCardType } from "../../types/startup";
import FavoriteButton from "../ui/button/favorite_button";
import { useRouter } from "next/navigation";

const StartupSpecCard: React.FC<StartupSpecCardType> = ({
  id,
  title,
  industry,
  description,
  is_favorited,
  image,
  required_specialists,
  founder_id,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <Avatar avatar={image} role="startup" />

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <div
          key={id}
          onClick={() => {
            router.push(`/startups/${id}`);
          }}
          className="flex flex-row gap-x-4 items-center"
        >
          <h2 className="text-h4 text-base-900">{title}</h2>
          <h2 className="text-h4 text-base-900">-</h2>
          <p className="text-base-700 text-body-s font-medium ">
            {industry?.name}
          </p>
        </div>

        <div className=" flex-grow">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {description}
          </p>
        </div>

        <div className="flex flex-row gap-x-4 items-center mt-2">
          <h3 className="text-body-m text-base-900 ">Требуемые специалисты:</h3>
          <ul className={` flex gap-2`}>
            {required_specialists &&
              required_specialists.map((required_specialist) => (
                <Button
                  onClick={() => {
                    router.push("/search/specialists");
                  }}
                  color="light-grey"
                  size="s"
                  key={required_specialist.profession.id}
                >
                  {required_specialist.profession.name}
                </Button>
              ))}
          </ul>
        </div>
        <div className="w-fit mt-2">
          <Button
            onClick={() => {
              router.push(`/messages/${founder_id}`);
            }}
          >
            Открыть чат
          </Button>
        </div>
      </div>

      <FavoriteButton
        isInitiallyFavorited={is_favorited || false}
        item={{ startup_id: id }}
      />
    </div>
  );
};

export default StartupSpecCard;

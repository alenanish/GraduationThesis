"use client";
import React, { useState } from "react";
import { Avatar, Button } from "@/app/components/ui";
import { SpecialistCardType } from "../../types/specialist";
import FavoriteButton from "../ui/button/favorite_button";
import SkillsList from "./show/skills";
import { Skill } from "@/app/types/skill";
import { useRouter } from "next/navigation";

const SpecialistCard: React.FC<SpecialistCardType> = ({
  id,
  user_id,
  full_name,
  profession,
  bio,
  skills,
  is_favorited: initialIsFavorited,
  avatar,
}) => {
  const router = useRouter();
  const [isFavorited] = useState(initialIsFavorited);

  function limitSkills(skills: Skill[], limit: number = 4): Skill[] {
    return skills.length > limit ? skills.slice(0, limit) : skills;
  }
  return (
    <div
      key={id}
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <Avatar avatar={avatar} role="user" />
      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <div
          className="flex flex-row gap-x-4 items-center"
          key={user_id}
          onClick={() => {
            router.push(`/profile/${user_id}`);
          }}
        >
          <h2 className="text-h4 text-base-900">{full_name}</h2>
          <h2 className="text-h4 text-base-900">-</h2>
          <p className="text-base-700 text-body-s font-medium ">
            {profession?.name}
          </p>
        </div>

        <div className=" flex-grow ">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {bio}
          </p>
        </div>

        <SkillsList skills={limitSkills(skills)} className=" flex-nowrap" />
        <div className="mt-2">
          <Button
            onClick={() => {
              router.push(`/messages/${user_id}`);
            }}
          >
            Открыть чат
          </Button>
        </div>
      </div>
      <div>
        <FavoriteButton
          item={{ user_id: user_id }}
          isInitiallyFavorited={isFavorited}
        />
      </div>
    </div>
  );
};

export default SpecialistCard;

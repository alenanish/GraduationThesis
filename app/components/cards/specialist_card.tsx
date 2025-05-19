"use client";
import React, { useState } from "react";
import { Button } from "@/app/components/ui";
import Link from "next/link";
import { SpecialistCardType } from "../../types/specialist";
import FavoriteButton from "../ui/button/favorite_button";

const SpecialistCard: React.FC<SpecialistCardType> = ({
  user_id,
  full_name,
  profession,
  bio,
  skills,
  is_favorited: initialIsFavorited,
  avatar,
}) => {
  const [isFavorited] = useState(initialIsFavorited);

  return (
    <div
      key={user_id}
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <div className="hidden md:block">
        <img
          src={avatar ? avatar : "default-user.png"}
          className=" w-[246px] h-[218px] bg-clip-content object-cover"
        />
      </div>

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <Link key={user_id} href={`/profile/${user_id}`} passHref>
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{full_name}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {profession.name}
            </p>
          </div>
        </Link>
        <div className=" flex-grow ">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {bio}
          </p>
        </div>

        <div className="flex flex-row gap-x-4 items-center mt-2">
          <h3 className="text-body-m text-base-900 ">Навыки:</h3>
          <div className="flex flex-wrap gap-4 ">
            {skills.map((skill) => (
              <Link
                id={skill.name}
                key={skill.name}
                href="/search/specialists"
                passHref
              >
                <Button color="light-grey" size="s" key={skill.id}>
                  {skill.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <Link href={`/messages/${user_id}`} className="w-fit mt-2" passHref>
          <Button className="w-fit mt-2">Открыть чат</Button>
        </Link>
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

"use client";
import React from "react";
import { Avatar, Button } from "@/app/components/ui";
import Link from "next/link";
import { CurrencyRuble } from "../icons";
import { InvestorCardType } from "../../types/investor";
import FavoriteButton from "../ui/button/favorite_button";
import { useRouter } from "next/navigation";

const InvestorCard: React.FC<InvestorCardType> = ({
  user_id,
  full_name,
  bio,
  avatar,
  investment_max,
  is_favorited,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <Avatar avatar={avatar} role="user" />

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <div
          key={user_id}
          onClick={() => {
            router.push(`/profile/${user_id}`);
          }}
          className="flex flex-row gap-x-4 items-center"
        >
          <h2 className="text-h4 text-base-900">{full_name}</h2>
          <h2 className="text-h4 text-base-900">-</h2>
          <p className="text-base-700 text-body-s font-medium ">{}</p>
        </div>
        <div className=" flex-grow">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {bio}
          </p>
        </div>

        <div className="flex flex-row gap-x-1 items-center  mt-2">
          <h3 className="text-body-m text-base-900 ">
            Инвестиционный капитал: {investment_max}
          </h3>
          <CurrencyRuble size={20} color="var(--color-base-700)" />
        </div>
        <Link href={`/messages/${user_id}`} className="w-fit mt-2" passHref>
          <Button className="w-fit mt-2">Открыть чат</Button>
        </Link>
      </div>

      <FavoriteButton
        isInitiallyFavorited={is_favorited}
        item={{ user_id: user_id }}
      />
    </div>
  );
};

export default InvestorCard;

"use  client"
import React, { useState } from "react";
import { Button, IconButton } from "@/app/components/ui";
import Link from "next/link";
import { CurrencyRuble, Favourite, NotFavourite } from "../../icons";

interface SpecialistCardProps {
  id: number;
  full_name: string;
  profession: string;
  bio: string;
  investment_max: number;
  is_favorited: boolean;
  img_url?: string | undefined;

  apiEndpoint: string;
}

const InvestorCard: React.FC<SpecialistCardProps> = ({
  id,
  full_name,
  profession,
  bio,
  investment_max,
  is_favorited: initialIsFavorited,
  img_url,
  apiEndpoint,
}) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const handleFavoriteClick = async () => {
    try {
      const method = isFavorited ? "DELETE" : "POST"; // Determine method based on current state

      const response = await fetch(`${apiEndpoint}/favorites/${id}`, {
        // Replace with your actual API endpoint
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Add any necessary authentication headers here (e.g., 'Authorization': 'Bearer YOUR_TOKEN')
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Assuming the API returns the new is_favorited status or similar
      const data = await response.json();

      setIsFavorited(!isFavorited); // Toggle the state locally. In a real application, you may want to update the state according to the server's response
    } catch (error) {
      console.error("Error updating favorites:", error);
      //  Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      {/* Image or Placeholder */}
      <div className="hidden md:block">
        {img_url ? (
          <img
            src={img_url}
            className="w-[246px] h-[218px] bg-clip-content object-cover "
          />
        ) : (
          <img
            src={"DefaultUserProfile.png"}
            className="w-[246px] h-[218px] bg-clip-content object-cover "
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <Link key={id} href={`/investor/${id}`}>
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{full_name}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {profession}
            </p>
          </div>
        </Link>
        <div className=" flex-grow">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {bio}
          </p>
        </div>

        {/* Investments */}
        <div className="flex flex-row gap-x-1 items-center  mt-2">
          <h3 className="text-body-m text-base-900 ">
            Необходимые инвестиции: {investment_max}
          </h3>
          <CurrencyRuble size={20} color="var(--color-base-700)" />
        </div>

        <Link href={`/messages/${id}`} className="w-fit mt-2">
          <Button>Открыть чат</Button>
        </Link>
      </div>

      <div>
        <IconButton variant="secondary" size="s" onClick={handleFavoriteClick}>
          {isFavorited ? <Favourite size={24} /> : <NotFavourite size={24} />}
        </IconButton>
      </div>
    </div>
  );
};

export default InvestorCard;

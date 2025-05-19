"use client";
import React, { useState } from "react";
import { Button, IconButton } from "@/app/components/ui";
import Link from "next/link";
import { Favourite, NotFavourite } from "../icons";
import { StartupCardType } from "../../types/startup";

const StartupCard: React.FC<StartupCardType> = ({
  id,
  title,
  industry,
  description,
  is_favorited,
  avatar,
  required_specialists,
  id_founder,
}) => {
  const [isFavorited, setIsFavorited] = useState(is_favorited);

  const handleFavoriteClick = async () => {
    try {
      const method = isFavorited ? "DELETE" : "POST"; // Determine method based on current state

      const response = await fetch(`$/favorites/startup/${id}`, {
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
        {avatar ? (
          <img
            src={avatar}
            className="w-[246px] h-[218px] bg-clip-content object-cover "
          />
        ) : (
          <img
            src={"Startup.png"}
            className="w-[246px] h-[218px] bg-clip-content object-cover "
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <Link key={id} href={`/startup/${id}`}>
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

        {/* Required Specialists */}
        <div className="flex flex-row gap-x-4 items-center mt-2">
          <h3 className="text-body-m text-base-900 ">Требуемые специалисты:</h3>
          <div className="flex overflow-clip gap-4 ">
            {required_specialists?.map((profession) => (
              <Link
                id={profession.name}
                key={profession.id}
                href="/search/specialists"
              >
                <Button color="light-grey" size="s" key={profession.id}>
                  {profession.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <Link href={`/messages/${id_founder}`} className="w-fit mt-2" passHref>
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

export default StartupCard;

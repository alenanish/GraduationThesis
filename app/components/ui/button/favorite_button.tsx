"use client";
import React, { useState, useEffect } from "react";
import IconButton from "./icon-button";
import { Favourite, NotFavourite } from "../../icons";
import { authenticatedRequest } from "@/app/utils/api";

interface FavoriteButtonProps {
  item: { user_id?: number; startup_id?: number };
  isInitiallyFavorited: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  item,
  isInitiallyFavorited,
}) => {
  const [isFavorited, setIsFavorited] = useState(isInitiallyFavorited);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsFavorited(isInitiallyFavorited);
  }, [isInitiallyFavorited]);

  const handleFavoriteClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(item);
      if (isFavorited) {
        await authenticatedRequest("/favorites/remove/", "delete", item);
      } else {
        await authenticatedRequest("/favorites/", "post", item);
      }

      setIsFavorited(!isFavorited);
    } catch (err: any) {
      setError(err.message || "Failed to update favorite status");
      console.error("Error updating favorite status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <IconButton
        variant="secondary"
        size="s"
        onClick={handleFavoriteClick}
        disabled={isLoading}
      >
        {isLoading ? (
          "Loading..."
        ) : isFavorited ? (
          <Favourite size={24} />
        ) : (
          <NotFavourite size={24} />
        )}
      </IconButton>
    </div>
  );
};

export default FavoriteButton;

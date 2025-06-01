"use client";

import { Delete, Plus } from "@/app/components/icons";
import { IconButton } from "@/app/components/ui";
import React, { useState, useCallback, useRef } from "react";
import { authenticatedRequest } from "@/app/utils/api";
import { User } from "@/app/types/user";

interface ImageUploaderProps {
  avatar?: string | null;
  image?: string | null;
  defaultUrl: string;
  onChange: (imageUrl: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  avatar,
  onChange,
  defaultUrl,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(avatar || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = async () => {
          const newImageUrl = reader.result as string;
          setImageUrl(newImageUrl);
          onChange(newImageUrl);

          const formData = new FormData();
          formData.append("avatar", file);

          try {
            const response = await authenticatedRequest<User>(
              "/profile/me/",
              "put",
              formData
            );

            if (response.status === 200) {
              if (response.data.avatar) {
                setImageUrl(response.data.avatar);
                onChange(response.data.avatar);
              }
            }
          } catch (error) {
            console.error("Ошибка загрузки изображения:", error);
          }
        };

        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const handleImageDelete = useCallback(() => {
    setImageUrl(null);
    onChange(null);
  }, [onChange]);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <img
        src={imageUrl ? imageUrl : defaultUrl}
        alt="Uploaded Image"
        className="col-span-1 h-auto object-cover"
      />

      <div className="absolute top-0 right-0 flex flex-row">
        <IconButton
          id="delete"
          type="button"
          variant="tertiary"
          size="s"
          color="base"
          onClick={handleImageDelete}
          disabled={!avatar}
        >
          <Delete size={24} />
        </IconButton>

        <IconButton
          id="add"
          type="button"
          variant="tertiary"
          size="s"
          color="base"
          onClick={handleAddImageClick}
        >
          <Plus size={24} />
        </IconButton>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};

export default ImageUploader;

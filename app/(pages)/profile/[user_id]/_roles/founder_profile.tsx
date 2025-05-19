"use client";
import { Edit, Gmail, Phone } from "@/app/components/icons";
import { IconButton, JobExperience } from "@/app/components/ui";
import { FounderType } from "@/app/types/founder";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const FounderProfile = () => {
  const [founder, setFounder] = useState<FounderType>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response: AxiosResponse<FounderType> =
          await authenticatedRequest<FounderType>("/profile/me/", "get");
        setFounder(response.data);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!founder) {
    return;
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <div className="flex flex-row justify-between ">
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{founder.full_name}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {founder.industry?.name}
            </p>
          </div>
          <div>
            <Link href="/profile/edit" passHref>
              <IconButton size="s" color="base" variant="tertiary">
                {<Edit />}
              </IconButton>
            </Link>
          </div>
        </div>
        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-h5 font-medium">Описание</h2>
          <p className="text-body-m text-base-500 whitespace-pre-wrap">
            {founder.bio}
          </p>
        </div>

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-h5 font-medium">Опыт работы</h2>
          <JobExperience experiences={founder.experience} isEdit={false} />
        </div>
      </div>

      <div className="flex flex-col gap-y-4 col-span-1">
        {founder.avatar ? (
          <img src={founder.avatar} className=" h-auto object-cover" />
        ) : (
          <img
            src={"/DefaultUserProfile.png"}
            className="  h-auto object-cover"
          />
        )}

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <h2 className="text-body-m font-medium">Контакты:</h2>
          <div className="flex flex-row gap-2 items-center">
            <Phone size={16} color="var(--color-prime-500)" />{" "}
            {founder.contact_phone}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Gmail size={16} color="var(--color-prime-500)" />{" "}
            {founder.contact_email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderProfile;

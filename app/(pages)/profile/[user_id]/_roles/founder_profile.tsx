"use client";
import ContactInfo from "@/app/components/cards/show/contact_info";
import { Avatar, Button, JobExperience } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import { FounderType } from "@/app/types/founder";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface FounderProfileProps {
  user_id: number;
}

const FounderProfile: React.FC<FounderProfileProps> = ({ user_id }) => {
  const [founder, setFounder] = useState<FounderType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<FounderType> =
          await authenticatedRequest<FounderType>(
            `/profile/${user_id}/`,
            "get"
          );
        setFounder(response.data);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
  if (loading) {
    return <Loading />;
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
        <Avatar avatar={founder.avatar} role="user" />

        <Link href={`/messages/${founder.user_id}`} passHref>
          <Button className="w-full" type="button">
            Написать
          </Button>
        </Link>

        <ContactInfo
          contact_email={founder.contact_email}
          contact_phone={founder.contact_phone}
        />
      </div>
    </div>
  );
};

export default FounderProfile;

"use client";
import { Edit } from "@/app/components/icons";
import {
  Avatar,
  Bio,
  Header,
  IconButton,
  JobExperience,
  Label,
} from "@/app/components/ui";
import ContactInfo from "@/app/components/cards/show/contact_info";
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
        <Header
          title={founder.full_name}
          subTitle={founder.industry?.name}
          button={
            <Link href="/profile/edit" passHref>
              <IconButton size="s" color="base" variant="tertiary">
                {<Edit />}
              </IconButton>
            </Link>
          }
        />

        <Bio bio={founder.bio} />

        <Label label="Опыт работы">
          <JobExperience experiences={founder.experience} isEdit={false} />
        </Label>
      </div>

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={founder.avatar} role="user" />

        <ContactInfo
          contact_email={founder.contact_email}
          contact_phone={founder.contact_phone}
        />
      </div>
    </div>
  );
};

export default FounderProfile;

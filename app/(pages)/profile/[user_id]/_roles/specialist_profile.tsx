"use client";
import { SpecialistType } from "@/app/types/specialist";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";

import FavoriteButton from "@/app/components/ui/button/favorite_button";
import {
  Avatar,
  Bio,
  Button,
  Header,
  JobExperience,
  Label,
} from "@/app/components/ui";
import ContactInfo from "@/app/components/cards/show/contact_info";
import SkillsList from "@/app/components/cards/show/skills";
import { useRouter } from "next/navigation";

interface SpecialistProfileProps {
  user_id: number;
}

const SpecialistProfile: React.FC<SpecialistProfileProps> = ({ user_id }) => {
  const router = useRouter();
  const [specialist, setSpecialist] = useState<SpecialistType>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response: AxiosResponse<SpecialistType> =
          await authenticatedRequest<SpecialistType>(
            `/profile/${user_id}/`,
            "get"
          );
        setSpecialist(response.data);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!specialist) {
    return;
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <Header
          title={specialist.full_name}
          subTitle={specialist.profession?.name}
          button={
            <FavoriteButton
              isInitiallyFavorited={specialist.is_favorited}
              item={{ user_id: specialist.user_id }}
            />
          }
        />

        <Bio bio={specialist.bio} />

        <Label label="Опыт работы">
          <JobExperience experiences={specialist.experience} isEdit={false} />
        </Label>
        <SkillsList skills={specialist.skills} className=" flex-wrap" />
      </div>

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={specialist.avatar} role="user" />
        <div
          onClick={() => {
            router.push(`/messages/${specialist.user_id}`);
          }}
        >
          <Button className="w-full" type="button">
            Написать
          </Button>
        </div>

        <ContactInfo
          contact_email={specialist.contact_email}
          contact_phone={specialist.contact_phone}
        />
      </div>
    </div>
  );
};

export default SpecialistProfile;

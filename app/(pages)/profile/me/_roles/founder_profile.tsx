"use client";

import { Edit } from "@/app/components/icons";
import {
  Avatar,
  Bio,
  Button,
  ErrorMessage,
  Header,
  IconButton,
  JobExperience,
} from "@/app/components/ui";
import ContactInfo from "@/app/components/cards/show/contact_info";
import { FounderType } from "@/app/types/founder";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import { Experience } from "@/app/types/experience";
import ExperienceModal from "../_forms/experience_modal";
import Loading from "@/app/components/ui/custom/loading";
import { useRouter } from "next/navigation";

const FounderProfile = () => {
  const router = useRouter();
  const [founder, setFounder] = useState<FounderType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isModalOpen, setModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const handleAddExperience = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveExperience = (experience: Experience) => {
    setIsLoading(true);
    setExperiences((prev) => [...prev, experience]);
  };

  useEffect(() => {
    if (founder && experiences.length > 0) {
      const updateExperiences = async () => {
        try {
          const response: AxiosResponse<FounderType> =
            await authenticatedRequest<FounderType>("/profile/me/", "put", {
              experience: experiences,
            });
          if (response.status === 200) {
            setFounder(response.data);
            handleCloseModal();
          }
        } catch (err: any) {
          setError(err?.message || "Ошибка при обновлении опыта.");
        } finally {
          setIsLoading(false);
        }
      };
      updateExperiences();
    }
  }, [experiences]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response: AxiosResponse<FounderType> =
          await authenticatedRequest<FounderType>("/profile/me/", "get");
        setFounder(response.data);
        setExperiences(response.data.experience);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        onClose={() => {
          setError(null);
        }}
      >
        Ошибка: {error}
      </ErrorMessage>
    );
  }

  if (!founder) {
    return (
      <ErrorMessage
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </ErrorMessage>
    );
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <Header
          title={founder.full_name}
          subTitle={founder.industry?.name}
          button={
            <div
              onClick={() => {
                router.push("/profile/edit");
              }}
            >
              <IconButton size="s" color="base" variant="tertiary">
                <Edit />
              </IconButton>
            </div>
          }
        />

        <Bio bio={founder.bio} />

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-h5 font-medium">Опыт работы</h2>

            <Button variant="tertiary" size="s" onClick={handleAddExperience}>
              Добавить опыт
            </Button>
          </div>

          <JobExperience experiences={founder.experience} isEdit={false} />
        </div>
      </div>
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        saveChanges={handleSaveExperience}
      />

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

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
import { SpecialistType } from "@/app/types/specialist";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import SkillsList from "@/app/components/cards/show/skills";
import { Experience } from "@/app/types/experience";
import Loading from "@/app/components/ui/custom/loading";
import ExperienceModal from "../_forms/experience_modal";
import { useRouter } from "next/navigation";

const SpecialistProfile = () => {
  const router = useRouter();
  const [specialist, setSpecialist] = useState<SpecialistType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    if (specialist && experiences.length > 0) {
      const updateExperiences = async () => {
        try {
          const response: AxiosResponse<SpecialistType> =
            await authenticatedRequest<SpecialistType>("/profile/me/", "put", {
              experience: experiences,
            });
          if (response.status === 200) {
            setSpecialist(response.data);
            setSuccessMessage("Опыт успешно обновлен!");
            handleCloseModal();
          }
        } catch (err: any) {
          setError(err?.message || "Ошибка при обновлении опыта.");
          setIsLoading(false);
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
        const response: AxiosResponse<SpecialistType> =
          await authenticatedRequest<SpecialistType>("/profile/me/", "get");
        setSpecialist(response.data);
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

  if (!isLoading && error) {
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

  if (!specialist) {
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
          title={specialist.full_name}
          subTitle={specialist.profession?.name}
          button={
            <div
              onClick={() => {
                router.push("/profile/edit");
              }}
            >
              <IconButton size="s" color="base" variant="tertiary">
                {<Edit />}
              </IconButton>
            </div>
          }
        />

        <Bio bio={specialist.bio} />

        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-h5 font-medium">Опыт работы</h2>

            <Button variant="tertiary" size="s" onClick={handleAddExperience}>
              Добавить опыт
            </Button>
          </div>

          <JobExperience experiences={specialist.experience} isEdit={false} />
        </div>
        <SkillsList skills={specialist.skills} className=" flex-wrap" />
      </div>
      <ExperienceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        saveChanges={handleSaveExperience}
      />

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={specialist.avatar} role="user" />

        <ContactInfo
          contact_email={specialist.contact_email}
          contact_phone={specialist.contact_phone}
        />
      </div>
    </div>
  );
};

export default SpecialistProfile;

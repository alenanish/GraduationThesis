"use client";
import { Edit } from "@/app/components/icons";
import {
  Avatar,
  Bio,
  Button,
  Header,
  IconButton,
} from "@/app/components/ui";
import ContactInfo from "@/app/components/cards/show/contact_info";
import { InvestorExperienceType, InvestorType } from "@/app/types/investor";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import InvestExperience from "@/app/components/cards/investment_experience/invest_experience";
import InvestorPreferences from "@/app/components/cards/show/investor_preferences";
import Loading from "@/app/components/ui/custom/loading";
import InvestExperienceModal from "../_forms/invest_experience_modal";
import { useRouter } from "next/navigation";

const InvestorProfile = () => {
  const router = useRouter();
  const [investor, setInvestor] = useState<InvestorType>();
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [experiences, setExperiences] = useState<InvestorExperienceType[]>([]);

  const handleAddExperience = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveExperience = (experience: InvestorExperienceType) => {
    setIsLoading(true);
    setExperiences((prev) => [...prev, experience]);
  };

  useEffect(() => {
    if (investor && experiences.length > 0) {
      const updateExperiences = async () => {
        try {
          const response: AxiosResponse<InvestorType> =
            await authenticatedRequest<InvestorType>("/profile/me/", "put", {
              experience: experiences,
            });
          if (response.status === 200) {
            setInvestor(response.data);
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
        const response: AxiosResponse<InvestorType> =
          await authenticatedRequest<InvestorType>("/profile/me/", "get");
        setInvestor(response.data);
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
  if (!investor) {
    return;
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <div className="space-y-1">
          <Header
            title={investor.full_name}
            subTitle={investor.industry?.name}
            button={
              <div onClick={()=>{router.push("/profile/edit")}}>
                <IconButton size="s" color="base" variant="tertiary">
                  {<Edit />}
                </IconButton>
              </div>
            }
          />
          {investor.position && investor.company && (
            <div className="flex flex-row gap-x-4 items-center">
              <h2 className="text-h5 font-medium text-base-600">
                {investor.position}
              </h2>
              <h2 className="text-h4 text-base-600">-</h2>
              <p className="text-base-600 text-body-m font-medium ">
                {investor.company}
              </p>
            </div>
          )}
        </div>
        <Bio bio={investor.bio} />
        <InvestorPreferences
          prefered_stages={investor.preferred_stages}
          investment_min={investor.investment_min}
          investment_max={investor.investment_max}
        />
        <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-h5 font-medium">Опыт работы</h2>

            <Button variant="tertiary" size="s" onClick={handleAddExperience}>
              Добавить опыт
            </Button>
          </div>
          <InvestExperience experiences={investor.experience} isEdit={false} />
        </div>
      </div>

      <InvestExperienceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        saveChanges={handleSaveExperience}
      />

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={investor.avatar} role="user" />

        <ContactInfo
          contact_email={investor.contact_email}
          contact_phone={investor.contact_phone}
        />
      </div>
    </div>
  );
};

export default InvestorProfile;

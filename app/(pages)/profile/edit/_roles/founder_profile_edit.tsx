"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import Link from "next/link";

import { Button } from "@/app/components/ui";

import ImageUploader from "./_components/image_uploader";

import { FounderType } from "@/app/types/founder";
import { Industry } from "@/app/types/industry";
import { Experience } from "@/app/types/experience";

import { api, authenticatedRequest } from "@/app/utils/api";
import EditContactInfo from "./_components/edit_contact_info";
import EditGeneralInfo from "./_components/edit_general_info";
import EditJobExperience from "./_components/edit_job_experience";

const FounderProfileEdit = () => {
  const [founder, setFounder] = useState<FounderType>();
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);
  const [options, setOptions] = useState<Industry[]>([]);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const router = useRouter();

  const handleAvatarChange = (newUrl: string | null) => {
    setAvatarUrl(newUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const list: AxiosResponse<Industry[]> = await api.get<Industry[]>(
          "/industries/"
        );
        if (list.data) {
          setOptions(list.data || []);
        }
        const response: AxiosResponse<FounderType> =
          await authenticatedRequest<FounderType>("/profile/me/", "get");
        if (response.data) {
          setFounder(response.data);
          setFullName(response.data.full_name || null);
          setContactPhone(response.data.contact_phone || "");
          setContactEmail(response.data.contact_email || "");
          setBio(response.data.bio || "");
          setExperiences(response.data.experience);
          if (response.data.industry) {
            setIndustry(response.data.industry);
          }
          setAvatarUrl(response.data.avatar || null);
        }
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let isValid = true;

    if (contactEmail === "") {
      setEmailError("Заполните это поле.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (fullName === "") {
      setFullNameError("Заполните это поле.");
      isValid = false;
    } else {
      setFullNameError(null);
    }

    if (!industry) {
      isValid = false;
    }

    setIsSaveButtonActive(isValid);
  }, [fullName, industry, contactEmail]);

  const handleSubmit = async () => {
    try {
      const payload = {
        full_name: fullName,
        industry_id: industry?.id,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        bio: bio,
        avatar: avatarUrl,
        experience: experiences,
      };

      console.log("Payload being sent:", payload);

      await authenticatedRequest("/profile/me/", "put", payload);

      const response: AxiosResponse<FounderType> =
        await authenticatedRequest<FounderType>("/profile/me/", "get");

      setFounder(response.data);
      setExperiences(response.data.experience);

      alert("Profile updated successfully!");
      router.push("/profile/me");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!founder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-end">
        <Button size="s" disabled={!isSaveButtonActive} onClick={handleSubmit}>
          Сохранить
        </Button>
        <Link href="/profile/me" passHref>
          <Button size="s" variant="tertiary" color="base">
            Отменить
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-x-4 ">
        <div className="flex flex-col  gap-y-4 col-span-4">
          <EditGeneralInfo
            fullName={fullName}
            setFullName={setFullName}
            label="Сфера"
            option={industry}
            setOption={setIndustry}
            bio={bio}
            setBio={setBio}
            options={options}
            fullNameError={fullNameError}
          />

          <EditJobExperience
            experiences={experiences}
            setExperiences={setExperiences}
          />
        </div>

        <div className="flex flex-col gap-y-4 col-span-1">
          <ImageUploader
            avatar={founder.avatar}
            onChange={handleAvatarChange}
            defaultUrl="/default-user.png"
          />
          <EditContactInfo
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            emailError={emailError}
            setEmailError={setEmailError}
          />
        </div>
      </div>
    </div>
  );
};

export default FounderProfileEdit;

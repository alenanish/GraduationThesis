"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import { Button, JobExperience, Label } from "@/app/components/ui";

import ImageUploader from "../_components/image_uploader";

import { FounderType } from "@/app/types/founder";
import { Industry } from "@/app/types/industry";
import { Experience } from "@/app/types/experience";

import { api, authenticatedRequest } from "@/app/utils/api";
import EditContactInfo from "../_components/edit_contact_info";
import EditGeneralInfo from "../_components/edit_general_info";
import Loading from "@/app/components/ui/custom/loading";
import { useAuth } from "@/app/context/auth_context";

interface DropdownOption {
  id: string | number;
  name: string;
}

const FounderProfileEdit = () => {
  const { isUserProfileComplited } = useAuth();

  const [founder, setFounder] = useState<FounderType>();
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);
  const [options, setOptions] = useState<Industry[]>([]);

  const [initialValues, setInitialValues] = useState<{
    fullName: string | null;
    contactPhone: string | null;
    contactEmail: string | null;
    bio: string | null;
    industry: Industry | null;
    avatarUrl: string | null;
    experiences: Experience[];
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  const handleAvatarChange = (newUrl: string | null) => {
    setAvatarUrl(newUrl);
  };

  const handleIndustryChange = (option: DropdownOption | null) => {
    if (option) {
      setIndustry({ id: Number(option.id), name: option.name });
    } else {
      setIndustry(null);
    }
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
          setInitialValues({
            fullName: response.data.full_name || null,
            contactPhone: response.data.contact_phone || null,
            contactEmail: response.data.contact_email || null,
            bio: response.data.bio || null,
            industry: response.data.industry || null,
            avatarUrl: response.data.avatar || null,
            experiences: response.data.experience || null,
          });
        }
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!initialValues) {
      setHasChanges(false);
      return;
    }
    const changed =
      fullName !== initialValues.fullName ||
      contactPhone !== initialValues.contactPhone ||
      contactEmail !== initialValues.contactEmail ||
      bio !== initialValues.bio ||
      industry !== initialValues.industry ||
      avatarUrl !== initialValues.avatarUrl ||
      JSON.stringify(experiences) !== JSON.stringify(initialValues.experiences);
    setHasChanges(changed);
  }, [
    fullName,
    contactPhone,
    contactEmail,
    bio,
    industry,
    avatarUrl,
    experiences,
    initialValues,
  ]);

  useEffect(() => {
    let isValid = true;

    if (contactEmail && contactEmail === "") {
      setEmailError("Обязательное поле.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (fullName && fullName === "") {
      setFullNameError("Обязательное поле.");
      isValid = false;
    } else {
      setFullNameError(null);
    }

    if (contactPhone && contactPhone === "") {
      setPhoneError("Обязательное поле.");
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (!industry) {
      isValid = false;
    }

    setIsSaveButtonActive(isValid && hasChanges);
  }, [
    fullName,
    contactEmail,
    contactPhone,
    industry,
    bio,
    avatarUrl,
    experiences,
    hasChanges,
  ]);

  const handleSubmit = async () => {
    setIsLoading(true);
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

      await authenticatedRequest("/profile/me/", "put", payload);

      const response: AxiosResponse<FounderType> =
        await authenticatedRequest<FounderType>("/profile/me/", "get");

      setFounder(response.data);
      setExperiences(response.data.experience);
      setInitialValues({
        fullName,
        contactPhone,
        contactEmail,
        bio,
        industry,
        avatarUrl,
        experiences,
      });

      setHasChanges(false);

      router.push(isUserProfileComplited ? "/profile/me" : "/home");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setIsLoading(false);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!founder || isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      {isUserProfileComplited ? (
        <div className="flex flex-row justify-end">
          <Button
            size="s"
            disabled={!isSaveButtonActive}
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
          <div
            onClick={() => {
              router.push("/profile/me");
            }}
          >
            <Button size="s" variant="tertiary" color="base">
              Отменить
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0.5"> 
          <h2 className="text-h5">Регистрация</h2>
          <p className="text-body-s text-base-400 italic">Для завершения регистрации необходимо заполнить данные аккаунта</p>
          </div>
          <Button
            size="s"
            disabled={!isSaveButtonActive}
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </div>
      )}

      <div className="grid grid-cols-5 gap-x-4 ">
        <div className="flex flex-col  gap-y-4 col-span-4">
          <EditGeneralInfo
            fullName={fullName}
            setFullName={setFullName}
            label="Сфера"
            option={industry}
            setOption={handleIndustryChange}
            bio={bio}
            setBio={setBio}
            options={options}
            fullNameError={fullNameError}
            setFullNameError={setFullNameError}
          />

          <Label label="Опыт работы">
            <JobExperience
              onExperiencesChange={setExperiences}
              experiences={experiences}
              isEdit={true}
            />
          </Label>
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

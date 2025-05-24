"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import Link from "next/link";

import { Button, Label } from "@/app/components/ui";

import ImageUploader from "../_components/image_uploader";

import { InvestorExperienceType, InvestorType } from "@/app/types/investor";

import { api, authenticatedRequest } from "@/app/utils/api";
import EditContactInfo from "../_components/edit_contact_info";
import EditGeneralInfo from "../_components/edit_general_info";
import Loading from "@/app/components/ui/custom/loading";
import { Industry } from "@/app/types/industry";
import EditInvestorPreferences from "../_components/edit_investor_preferences";
import InvestExperience from "@/app/components/cards/investment_experience/invest_experience";

interface DropdownOption {
  id: string | number;
  name: string;
}

const InvestorProfileEdit = () => {
  const [investor, setInvestor] = useState<InvestorType>();
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);
  const [options, setOptions] = useState<Industry[]>([]);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<InvestorExperienceType[] | []>(
    []
  );

  const [preferred_stages, setStages] = useState<string[] | []>([]);
  const [investment_min, setInvestmentMin] = useState<string | null>(null);
  const [investment_max, setInvestmentMax] = useState<string | null>(null);

  const [initialValues, setInitialValues] = useState<{
    fullName: string | null;
    contactPhone: string | null;
    contactEmail: string | null;
    company: string | null;
    position: string | null;
    bio: string | null;
    industry: Industry | null;
    avatarUrl: string | null;
    preferred_stages: string[] | null;
    investment_min: string | null;
    investment_max: string | null;
    experience: InvestorExperienceType[] | [];
  } | null>(null);

  const handleChangeStages = (selectedValues: string[] | []) => {
    setStages(selectedValues);
  };

  const router = useRouter();

  const handleAvatarChange = (newUrl: string | null) => {
    setAvatarUrl(newUrl);
  };

  const handleIndystryChange = (option: DropdownOption | null) => {
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
        const response: AxiosResponse<InvestorType> =
          await authenticatedRequest<InvestorType>("/profile/me/", "get");
        if (response.data) {
          setInvestor(response.data);
          setFullName(response.data.full_name || null);
          setContactPhone(response.data.contact_phone || "");
          setContactEmail(response.data.contact_email || "");
          setBio(response.data.bio || "");
          setPosition(response.data.position || "");
          setCompany(response.data.company || "");
          setExperiences(response.data.experience || []);
          setStages(response.data.preferred_stages || []);
          setInvestmentMin(response.data.investment_min || null);
          setInvestmentMax(response.data.investment_max || null);
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
    if (!initialValues) {
      setHasChanges(false);
      return;
    }

    const changed =
      fullName !== initialValues.fullName ||
      contactPhone !== initialValues.contactPhone ||
      contactEmail !== initialValues.contactEmail ||
      bio !== initialValues.bio ||
      company !== initialValues.company ||
      position !== initialValues.position ||
      avatarUrl !== initialValues.avatarUrl ||
      preferred_stages !== initialValues.preferred_stages ||
      investment_max !== initialValues.investment_max ||
      investment_min !== initialValues.investment_min ||
      JSON.stringify(experiences) !== JSON.stringify(initialValues.experience);
    setHasChanges(changed);
  }, [
    fullName,
    contactPhone,
    contactEmail,
    bio,
    company,
    avatarUrl,
    position,
    experiences,
    preferred_stages,
    investment_min,
    investment_max,
    initialValues,
  ]);

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

    setIsSaveButtonActive(isValid && hasChanges);
    const hasAnyChanges =
      fullName !== initialValues?.fullName ||
      contactPhone !== initialValues?.contactPhone ||
      contactEmail !== initialValues?.contactEmail ||
      bio !== initialValues?.bio ||
      company !== initialValues?.company ||
      position !== initialValues?.position ||
      avatarUrl !== initialValues?.avatarUrl ||
      JSON.stringify(preferred_stages) !==
        JSON.stringify(initialValues?.preferred_stages) ||
      investment_min !== initialValues?.investment_min ||
      investment_max !== initialValues?.investment_max ||
      JSON.stringify(experiences) !== JSON.stringify(initialValues?.experience);

    setHasChanges(hasAnyChanges);
    setIsSaveButtonActive(isValid && hasChanges);
  }, [
    fullName,
    contactPhone,
    contactEmail,
    bio,
    company,
    position,
    avatarUrl,
    experiences,
    preferred_stages,
    investment_min,
    investment_max,
    initialValues,
  ]);

  const handleSubmit = async () => {
    try {
      const payload = {
        full_name: fullName,
        industry_id: industry?.id,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        bio: bio,
        position: position,
        company: company,
        avatar: avatarUrl,
        experience: experiences,
        investment_min: investment_min ? Number(investment_min) : null,
        investment_max: investment_max ? Number(investment_max) : null,
        preferred_stages: preferred_stages,
      };

      console.log("form", payload);

      await authenticatedRequest("/profile/me/", "put", payload);

      const response: AxiosResponse<InvestorType> =
        await authenticatedRequest<InvestorType>("/profile/me/", "get");

      setInvestor(response.data);
      setExperiences(response.data.experience || []);

      setInitialValues({
        fullName,
        contactPhone,
        contactEmail,
        company,
        position,
        bio,
        industry,
        avatarUrl,
        preferred_stages,
        investment_min,
        investment_max,
        experience: experiences,
      });
      setHasChanges(false);

      router.replace("/profile/me");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert("Не удалось обновить профиль. Попробуйте еще раз.");
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!investor) {
    return <Loading />;
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
            label={"Профессия"}
            option={industry}
            setOption={handleIndystryChange}
            bio={bio}
            setBio={setBio}
            position={position}
            setPosition={setPosition}
            company={company}
            setCompany={setCompany}
            options={options}
            fullNameError={fullNameError}
            setFullNameError={setFullNameError}
          />

          <EditInvestorPreferences
            preferred_stages={preferred_stages}
            setStages={handleChangeStages}
            investment_max={investment_min}
            setInvestmentMin={setInvestmentMin}
            investment_min={investment_max}
            setInvestmentMax={setInvestmentMax}
          />
          <Label label="Предыдущие инвестиции">
            <InvestExperience
              experiences={experiences}
              isEdit={true}
              onExperiencesChange={setExperiences}
            />
          </Label>
        </div>

        <div className="flex flex-col gap-y-4 col-span-1">
          <ImageUploader
            avatar={investor.avatar}
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

export default InvestorProfileEdit;

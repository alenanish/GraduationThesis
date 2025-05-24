"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import Link from "next/link";

import { Button, JobExperience, Label } from "@/app/components/ui";

import ImageUploader from "../_components/image_uploader";

import { SpecialistType } from "@/app/types/specialist";
import { Profession } from "@/app/types/profession";
import { Experience } from "@/app/types/experience";

import { api, authenticatedRequest } from "@/app/utils/api";
import EditContactInfo from "../_components/edit_contact_info";
import EditGeneralInfo from "../_components/edit_general_info";
import Loading from "@/app/components/ui/custom/loading";
import NewSkillsList from "../_components/new_skill";
import { Skill } from "@/app/types/skill";

interface DropdownOption {
  id: string | number;
  name: string;
}

const SpecialistProfileEdit = () => {
  const [specialist, setSpecialist] = useState<SpecialistType>();
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);
  const [contactPhone, setContactPhone] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [profession, setProfession] = useState<Profession | null>(null);
  const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);
  const [options, setOptions] = useState<Profession[]>([]);

  const [initialValues, setInitialValues] = useState<{
    fullName: string | null;
    contactPhone: string | null;
    contactEmail: string | null;
    bio: string | null;
    profession: Profession | null;
    avatarUrl: string | null;
    experience: Experience[];
    skills: Skill[];
  } | null>(null);

  const [hasChanges, setHasChanges] = useState(false);

  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [listOfSkills, setListOfSkills] = useState<Skill[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAvatarChange = (newUrl: string | null) => {
    setAvatarUrl(newUrl);
  };

  const handleProfessionChange = (option: DropdownOption | null) => {
    if (option) {
      setProfession({ id: Number(option.id), name: option.name });
    } else {
      setProfession(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const list_professions: AxiosResponse<Profession[]> = await api.get<
          Profession[]
        >("/professions/");
        if (list_professions.data) {
          setOptions(list_professions.data || []);
        }
        const list_skills: AxiosResponse<Skill[]> = await api.get<Skill[]>(
          "/skills/"
        );
        if (list_skills.data) {
          setListOfSkills(list_skills.data || []);
        }
        const response: AxiosResponse<SpecialistType> =
          await authenticatedRequest<SpecialistType>("/profile/me/", "get");
        if (response.data) {
          setSpecialist(response.data);
          setFullName(response.data.full_name || null);
          setContactPhone(response.data.contact_phone || "");
          setContactEmail(response.data.contact_email || "");
          setBio(response.data.bio || "");
          setExperience(response.data.experience);
          setProfession(response.data.profession);
          setAvatarUrl(response.data.avatar || null);
          setSkills(response.data.skills);
          setInitialValues({
            fullName: response.data.full_name || null,
            contactPhone: response.data.contact_phone || null,
            contactEmail: response.data.contact_email || null,
            bio: response.data.bio || null,
            profession: response.data.profession || null,
            avatarUrl: response.data.avatar || null,
            experience: response.data.experience || null,
            skills: response.data.skills || null,
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
      profession !== initialValues.profession ||
      avatarUrl !== initialValues.avatarUrl ||
      JSON.stringify(skills) !== JSON.stringify(initialValues.skills) ||
      JSON.stringify(experience) !== JSON.stringify(initialValues.experience);
    setHasChanges(changed);
  }, [
    fullName,
    contactPhone,
    contactEmail,
    bio,
    profession,
    avatarUrl,
    experience,
    skills,
    initialValues,
  ]);

  useEffect(() => {
    let isValid = true;

    if (contactEmail === "") {
      setEmailError("Это обязательное поле.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (fullName === "") {
      setFullNameError("Это обязательное поле.");
      isValid = false;
    } else {
      setFullNameError(null);
    }

    if (contactPhone === "") {
      setPhoneError("Это обязательное поле.");
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (!profession) {
      isValid = false;
    }

    setIsSaveButtonActive(isValid && hasChanges);
  }, [
    fullName,
    contactEmail,
    contactPhone,
    profession,
    bio,
    avatarUrl,
    experience,
    skills,
    hasChanges,
  ]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        full_name: fullName,
        profession_id: profession?.id,
        contact_phone: contactPhone,
        contact_email: contactEmail,
        bio: bio,
        avatar: avatarUrl,
        experience: experience,
        skill_ids: skills.map((skill) => skill.id),
      };
      console.log(skills);

      await authenticatedRequest("/profile/me/", "put", payload);

      const response: AxiosResponse<SpecialistType> =
        await authenticatedRequest<SpecialistType>("/profile/me/", "get");

      setSpecialist(response.data);
      setExperience(response.data.experience);
      setInitialValues({
        fullName,
        contactPhone,
        contactEmail,
        bio,
        profession,
        avatarUrl,
        experience,
        skills,
      });

      setHasChanges(false);

      router.replace("/profile/me");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!specialist || isLoading) {
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
            label="Профессия"
            option={profession}
            setOption={handleProfessionChange}
            bio={bio}
            setBio={setBio}
            options={options}
            fullNameError={fullNameError}
            setFullNameError={setFullNameError}
          />

          <Label label="Опыт работы">
            <JobExperience
              onExperiencesChange={setExperience}
              experiences={experience}
              isEdit={true}
            />
          </Label>
          <NewSkillsList
            onSkillsChange={(skills) => {
              setSkills(skills);
            }}
            allSkills={listOfSkills}
            initialSkills={specialist.skills}
          />
        </div>

        <div className="flex flex-col gap-y-4 col-span-1">
          <ImageUploader
            avatar={specialist.avatar}
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

export default SpecialistProfileEdit;

import { Industry } from "./industry";
import { Profession } from "./profession";
import { Skill } from "./skill";
import { SpecialistType } from "./specialist";
import { User } from "./user";

interface StartupType {
  id?: number;
  founder?: User;
  founder_id: number;
  title: string;
  image: string | null;
  industry: Industry | null;
  description: string;
  stage: string;
  is_favorited?: boolean;
  views?: number;
  favorites_count?: number;
}

interface StartupSpecCardType extends StartupType {
  required_specialists?: RequiredSpecialist[] | [];
  role: string;
}

interface StartupForInvestmentsCardType extends StartupType {
  investment_needed: string;
  is_favorited: boolean;
}

interface RequiredSpecialist {
  id?: number;
  profession: Profession;
  profession_id?: number;
  skills_ids?: number[];
  skills: Skill[];
  specialist?: SpecialistType | null;
}

interface StartupCardType
  extends StartupSpecCardType,
    StartupForInvestmentsCardType {
  is_favorited: boolean;
}

interface Invitation {
  id?: number;
  specialist: User;
  required_specialist: RequiredSpecialist;
  is_accepted: boolean;
  created_at: string;
}

interface MyStartupType {
  id: number;
  role: string;
  title: string;
  image: string | null;
  description: string;
  stage: string;
  invitation_id: number;
}

export type {
  StartupType,
  StartupSpecCardType,
  StartupForInvestmentsCardType,
  StartupCardType,
  RequiredSpecialist,
  Invitation,
  MyStartupType,
};

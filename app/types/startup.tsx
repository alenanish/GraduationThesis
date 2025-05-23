import { Industry } from "./industry";
import { Profession } from "./profession";
import { Skill } from "./skill";
import { SpecialistType } from "./specialist";
import { User } from "./user";

interface StartupType {
  id: number;
  founder_id: number;
  title: string;
  image?: string;
  industry: Industry;
  description?: string;
  stage: string;
  is_favorited: boolean;
  views: number;
  favorites_count: number;
}

interface StartupSpecCardType extends StartupType {
  required_specialists?: RequiredSpecialist[] | [];
}

interface StartupForInvestmentsCardType extends StartupType {
  investment_needed: number;
}

interface RequiredSpecialist {
  id: number;
  profession: Profession;
  skills: Skill[];
  specialist?: SpecialistType;
}

interface StartupFounderType
  extends StartupType,
    StartupForInvestmentsCardType {
  founder: User;
 
}

export type {
  StartupType,
  StartupSpecCardType,
  StartupForInvestmentsCardType,
  StartupFounderType,
};

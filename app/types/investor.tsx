import { Industry } from "./industry";
import { User } from "./user";

interface InvestorType extends User {
  company: string;
  position: string;
  industry: Industry;
  preferred_stages: string[] | [];
  investment_min: string;
  investment_max: string;
  experience: InvestorExperienceType[] | [];
}

interface InvestorExperienceType {
  id?: number;
  title: string;
  industry: string;
  stage: string;
  date: string;
  description: string;
}

interface InvestorCardType extends InvestorType {
  is_favorited: boolean;
}

export type { InvestorType, InvestorCardType, InvestorExperienceType };

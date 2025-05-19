import { Industry } from "./industry";

interface InvestorType {
  user_id: number;
  role: string;
  full_name?: string;
  bio?: string;
  contact_phone?: string;
  contact_email?: string;
  avatar?: string;
  industry?: Industry;
  company?: string;
  position?: string;
  preferred_stages?: number[];
  investment_min?: number;
  investment_max?: number;
  experience?: InvestorExperienceType[] | [];
}

type ProjectState =
      | "expectation"
      | "in-process"
      | "launch"
      | "results-analysis"
      | "completed";

interface InvestorExperienceType {
  id: number,
  title: string;
  industry: Industry;
  stage: ProjectState;
  date: string; 
  description?: string;
}

interface InvestorCardType {
  id: number;
  full_name: string;
  industry: Industry;
  bio: string;
  avatar?: string;
  investment_max?: number;
  is_favorited: boolean;
}

export type { InvestorType, InvestorCardType, InvestorExperienceType };
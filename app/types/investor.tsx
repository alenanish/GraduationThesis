import { Industry } from "./industry";
import { User } from "./user";

interface InvestorType extends User{
  company?: string;
  position?: string;
  industry: Industry;
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

interface InvestorCardType extends InvestorType {
  is_favorited: boolean;
}

export type { InvestorType, InvestorCardType, InvestorExperienceType };
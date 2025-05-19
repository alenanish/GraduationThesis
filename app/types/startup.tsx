import { Industry } from "./industry";
import { Profession } from "./profession";

interface StartupType {
  id: number;
  founder: number;
  title: string;
  image?: string;
  industry: Industry;
  description?: string;
  stage?: string;
  investment_needed?: number;
  required_specialists?: Profession[];
  is_favorited?: boolean;
}

interface StartupCardType {
  id: number;
  title: string;
  industry: Industry;
  description: string;
  avatar?: string;
  required_specialists: Profession[];
  is_favorited: boolean;
  id_founder: number;
}

interface StartupForInvestmentsCardType {
  id: number;
  title: string;
  industry: Industry;
  description: string;
  avatar?: string;
  investment_needed: number;
  is_favorited: boolean;
  id_founder: number;
}

export type { StartupType, StartupCardType, StartupForInvestmentsCardType };

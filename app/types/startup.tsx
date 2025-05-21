import { Industry } from "./industry";
import { Profession } from "./profession";

interface StartupType {
  id: number;
  id_founder: number;
  title: string;
  avatar?: string;
  industry: Industry;
  description?: string;
  stage: string;
  is_favorited: boolean;
}

interface StartupSpecCardType extends StartupType {
  required_specialists: Profession[] | [];
}

interface StartupForInvestmentsCardType extends StartupType {
  investment_needed: number;
}

export type { StartupType, StartupSpecCardType, StartupForInvestmentsCardType };

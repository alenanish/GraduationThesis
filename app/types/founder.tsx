import { Experience } from "./experience";
import { Industry } from "./industry";

interface FounderType {
  id: number;
  email?: string | null;
  password?: string | null;
  role?: string;
  full_name?: string | null;
  bio?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  avatar?: string | null;
  industry?: Industry | null;
  experience: Experience[] | [];
  is_favorited?: boolean;
}

export type { FounderType };

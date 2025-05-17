import { Experience } from "./experience";
import { Profession } from "./profession";
import { Skill } from "./skill";

interface SpecialistType {
  user_id: number;
  role: string;
  full_name?: string;
  profession?: Profession;
  bio?: string;
  contact_phone?: string;
  contact_email?: string;
  avatar?: string;
  skills?: Skill[];
  experience?: Experience;
  is_favorited: boolean;
}

interface SpecialistCardType {
  id: number;
  full_name: string;
  profession: Profession;
  bio: string;
  skills: Skill[];
  avatar?: string;
  is_favorited: boolean;
}

export type { SpecialistType, SpecialistCardType };

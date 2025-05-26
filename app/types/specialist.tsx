import { Experience } from "./experience";
import { Profession } from "./profession";
import { Skill } from "./skill";
import { User } from "./user";

interface SpecialistType extends User {
  profession: Profession | null;
  skills: Skill[] | [];
  experience: Experience[] | [];
  is_favorited: boolean;
}

interface SpecialistCardType extends SpecialistType {
  id: number;
  is_favorited: boolean;
}

export type { SpecialistType, SpecialistCardType };

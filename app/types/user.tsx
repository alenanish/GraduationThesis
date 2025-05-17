import { Profession } from "./profession";
import { Skill } from "./skill";

interface User {
  user_id: number;
  role: string;
  full_name?: string;
  profession?: Profession;
  bio?: string;
  contact_phone?: string;
  contact_email?: string;
  avatar?: string;
  skills?: Skill[];
}

export type { User };

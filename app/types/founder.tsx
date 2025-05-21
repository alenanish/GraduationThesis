import { Experience } from "./experience";
import { Industry } from "./industry";
import { User } from "./user";

interface FounderType extends User {
  industry?: Industry | null;
  experience: Experience[] | [];
}

export type { FounderType };

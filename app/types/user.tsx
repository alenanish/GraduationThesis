type Role = "startup" | "specialist" | "investor";

interface User {
  user_id: number;
  email: string;
  password: string;
  role: Role;
  full_name?: string;
  bio?: string;
  contact_phone?: string;
  contact_email?: string;
  avatar?: string;
}

export type { User };

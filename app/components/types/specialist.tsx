interface Profession {
    id: number;
    name: string;
  }
  
  interface Skill {
    id: number;
    name: string;
  }
  
  interface Experience {
    id: number;
    organization: string;
    position: string;
    start_date: string; // Или Date, если вам нужен тип Date
    end_date: string | null; // Может быть null, если текущая работа
    description: string;
  }
  
  interface Specialist {
    user_id: number; // Или string, если это UUID или другое
    role: string;
    full_name: string;
    profession: Profession;
    bio: string;
    contact_phone: string;
    contact_email: string;
    avatar: string; // Или string | null, если аватар необязателен
    skills: Skill[];
    experience: Experience[];
  }
  
  export type {Specialist, Profession, Skill, Experience};
  
  
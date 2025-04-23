interface Specialist {
    id?: number;
    profession: string;
    skills?: string[];
    specialist?: boolean;
  }
  
  interface Startup {
    id: number;
    title: string;
    image?: string | null; 
    industry: string;
    description: string;
    stage?: string | undefined;
    investment_needed?: string | undefined;
    founder?: string | undefined;
    required_specialists: Specialist[];
    is_favorited: boolean;
    id_founder?: number | undefined;
  }
  
  
  export type {Startup};
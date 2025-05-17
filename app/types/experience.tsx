interface Experience {
  id: number;
  organization: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export type { Experience };

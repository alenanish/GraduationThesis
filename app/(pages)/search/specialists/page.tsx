"use client";
import React, { useState, useEffect, useCallback } from "react";
import { api } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import Loading from "@/app/components/ui/custom/loading";
import { ErrorMessage } from "@/app/components/ui";
import { SpecialistCardType } from "@/app/types/specialist";
import SpecSearchFilters from "./specialist_filters";
import SpecialistsList from "@/app/components/lists/specialists_list";

interface SearchFilters {
  min_experience_years: string | null;
  profession: string | null;
  skills: string[] | null;
}

interface DropdownOption {
  id: number | string;
  name: string;
}

async function searchSpecialists(
  filters: SearchFilters
): Promise<SpecialistCardType[]> {
  try {
    const response: AxiosResponse<SpecialistCardType[]> = await api.get(
      "/search/specialists/",
      {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
        },
        params: filters,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке специалистов:", error);
    return [];
  }
}

function SearchSpecialists() {
  const [professions, setProfessions] = useState<DropdownOption[]>([]);
  const [skills, setSkills] = useState<{ name: string; id: string }[]>([]);
  const [searchResults, setSearchResults] = useState<SpecialistCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const professionsResponse: AxiosResponse<DropdownOption[]> =
          await api.get("/professions/");
        setProfessions(professionsResponse.data);

        const skillsResponse: AxiosResponse<{ name: string; id: string }[]> =
          await api.get("/skills/");
        setSkills(skillsResponse.data);
      } catch (err: any) {
        setError(err?.message || "Не удалось загрузить данные.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback(
    async (filters: {
      profession: string | null;
      min_experience_years: string | null;
      skills: string[] | null;
    }) => {
      setIsLoading(true);
      const searchFilters: SearchFilters = {
        profession: filters.profession || null,
        min_experience_years: filters.min_experience_years || null,
        skills:
          filters.skills && filters.skills.length > 0
            ? filters.skills
            : null,
      };
      const cleanedFilters: SearchFilters = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, v]) => v !== undefined)
      ) as SearchFilters;

      try {
        const results = await searchSpecialists(cleanedFilters);
        setSearchResults(results);
        console.log("Результаты:", results);
      } catch (error) {
        setError("Данные о специалистах не получены.");
        console.error("Ошибка при получении данных:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        onClose={() => {
          setError(null);
        }}
      >
        {error}
      </ErrorMessage>
    );
  }

  return (
    <div className="flex">
      <div className="w-1/4">
        <SpecSearchFilters
          professions={professions}
          skills={skills}
          onSearch={handleSearch}
        />
      </div>

      <div className="w-3/4 p-4">
        <SpecialistsList specialists={searchResults} />
      </div>
    </div>
  );
}

export default SearchSpecialists;

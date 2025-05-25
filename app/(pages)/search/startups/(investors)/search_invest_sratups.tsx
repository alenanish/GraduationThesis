"use client";
import React, { useState, useEffect, useCallback } from "react";
import { api } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import ForSpecSearchFilters from "../(specialists)/for_specialist_filters";
import { StartupSpecCardType } from "@/app/types/startup";
import StartupsSpecList from "@/app/components/lists/startups_spec_list";
import Loading from "@/app/components/ui/custom/loading";
import { ErrorMessage } from "@/app/components/ui";

interface SearchFilters {
  industry?: string;
  stage?: string;
  required_profession?: string;
  required_skills?: string[];
}

interface DropdownOption {
  id: number | string;
  name: string;
}

async function searchStartups(
  filters: SearchFilters
): Promise<StartupSpecCardType[]> {
  try {
    const response: AxiosResponse<StartupSpecCardType[]> = await api.get(
      "/startups/search/",
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
    console.error("Ошибка при загрузке стартапов:", error);
    return [];
  }
}

function SearchInvestStartups() {
  const [industries, setIndustries] = useState<DropdownOption[]>([]);
  const [professions, setProfessions] = useState<DropdownOption[]>([]);
  const [skills, setSkills] = useState<{ name: string; id: string }[]>([]);
  const [searchResults, setSearchResults] = useState<StartupSpecCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const industriesResponse: AxiosResponse<DropdownOption[]> =
          await api.get("/industries/");
        setIndustries(industriesResponse.data);

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
      industry_id: number | null;
      stage: string | null;
      required_profession: string | null;
      required_skills: string[] | null;
    }) => {
      setIsLoading(true);
      const searchFilters: SearchFilters = {
        industry:
          filters.industry_id !== null
            ? String(filters.industry_id)
            : undefined,
        stage: filters.stage || undefined,
        required_profession: filters.required_profession || undefined,
        required_skills:
          filters.required_skills && filters.required_skills.length > 0
            ? filters.required_skills
            : undefined,
      };
      const cleanedFilters: SearchFilters = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, v]) => v !== undefined)
      ) as SearchFilters;

      try {
        const results = await searchStartups(cleanedFilters);
        setSearchResults(results);
        console.log("Результаты:", results);
      } catch (error) {
        setError("Данные о стартапах не получены.");
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
        <ForSpecSearchFilters
          industries={industries}
          professions={professions}
          skills={skills}
          onSearch={handleSearch}
        />
      </div>

      <div className="w-3/4 p-4">
        <StartupsSpecList startups={searchResults} />
      </div>
    </div>
  );
}

export default SearchInvestStartups;

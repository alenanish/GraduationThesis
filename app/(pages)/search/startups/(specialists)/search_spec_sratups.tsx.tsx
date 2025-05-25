"use client";
import { api } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect, useCallback } from "react";
import ForInvestSearchFilters from "../(investors)/for_invest_filters";
import Loading from "@/app/components/ui/custom/loading";
import { ErrorMessage } from "@/app/components/ui";
import StartupsInvestList from "@/app/components/lists/startups_invest_list";
import { StartupForInvestmentsCardType } from "@/app/types/startup";

interface SearchFilters {
  industry?: string;
  preferred_stages?: string[];
  investment_min?: number;
  investment_max?: number;
}

interface DropdownOption {
  id: number | string;
  name: string;
}

async function searchStartups(
  filters: SearchFilters
): Promise<StartupForInvestmentsCardType[]> {
  try {
    const response: AxiosResponse<StartupForInvestmentsCardType[]> =
      await api.get("/startups/search/", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("auth_token")}`,
        },
        params: filters,
      });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке стартапов:", error);
    return [];
  }
}

function SerchSpecStartups() {
  const [startups, setStartups] = useState<StartupForInvestmentsCardType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [industries, setIndustries] = useState<DropdownOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const ind_list: AxiosResponse<DropdownOption[]> = await api.get<
          DropdownOption[]
        >("/industries/");
        if (ind_list.data) {
          setIndustries(ind_list.data);
        }
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке отраслей.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  const handleSearch = useCallback(
    async (filters: {
      industry_id: number | null;
      preferred_stages: string[];
      investment_min: string | null;
      investment_max: string | null;
    }) => {
      setIsLoading(true);

      const searchFilters: SearchFilters = {
        industry:
          filters.industry_id !== null
            ? String(filters.industry_id)
            : undefined,
        preferred_stages:
          filters.preferred_stages.length > 0
            ? filters.preferred_stages
            : undefined,
        investment_min:
          filters.investment_min !== null
            ? Number(filters.investment_min)
            : undefined,
        investment_max:
          filters.investment_max !== null
            ? Number(filters.investment_max)
            : undefined,
      };

      const cleanedFilters: SearchFilters = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, v]) => v !== undefined)
      ) as SearchFilters;

      try {
        const results = await searchStartups(cleanedFilters);
        setStartups(results);
        console.log('res', results);
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
        <ForInvestSearchFilters
          industries={industries}
          onSearch={handleSearch}
        />
      </div>
     <div className="w-3/4 pl-4">
        <StartupsInvestList startups={startups} />
      </div>
    </div>
  );
}

export default SerchSpecStartups;

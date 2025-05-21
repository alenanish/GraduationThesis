"use client";
import StartupsInvestList from "@/app/components/lists/startups_invest_list";
import { ErrorMessage } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import { StartupForInvestmentsCardType } from "@/app/types/startup";
import { authenticatedRequest } from "@/app/utils/api";
import React, { useEffect, useState } from "react";

const FavouriteStartups = ({}) => {
  const [results, setResults] = useState<StartupForInvestmentsCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<StartupForInvestmentsCardType[]>(
          `/favorites/investors/`,
          "get"
        );
        setResults(response.data);
        console.log(response.request);
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке стартапов.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
    <div >
        <h2 className="text-h4 font-medium text-base-900 mb-1">Инвесторы</h2>
      <StartupsInvestList startups={results} />
    </div>
  );
};

export default FavouriteStartups;

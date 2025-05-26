"use client";
import InvestorsList from "@/app/components/lists/investors_list";
import { ErrorMessage } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import { InvestorCardType } from "@/app/types/investor";
import { authenticatedRequest } from "@/app/utils/api";
import React, { useEffect, useState } from "react";

const FavouriteInvestors = ({}) => {
  const [results, setResults] = useState<InvestorCardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<InvestorCardType[]>(
          `/favorites/investors/`,
          "get"
        );
        setResults(response.data);
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке инвесторов.");
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
    <div>
      <h2 className="text-h4 font-medium text-base-900 mb-1">Инвесторы</h2>
      <InvestorsList investors={results} />
    </div>
  );
};

export default FavouriteInvestors;

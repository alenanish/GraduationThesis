"use client";
import React, { useState, useEffect } from "react";
import { authenticatedRequest } from "@/app/utils/api";
import { StartupForInvestmentsCardType } from "@/app/types/startup";
import { StartupCardInvestor } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";

const InvestorRecommendations = () => {
  const [startups, setStartups] = useState<StartupForInvestmentsCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<
          StartupForInvestmentsCardType[]
        >("/startups/recommendations/", "get");
        setStartups(response.data);
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
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      {startups.length > 0 ? (
        <ul>
          {startups.map((startup) => (
            <StartupCardInvestor key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <p className=" text-body-s italic text-base-400">
          Пока нет рекомендаций
        </p>
      )}
    </>
  );
};

export default InvestorRecommendations;

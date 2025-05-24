"use client";
import React, { useState, useEffect } from "react";
import StartupCard from "@/app/components/cards/startup_card_specialist";
import { authenticatedRequest } from "@/app/utils/api";
import { StartupSpecCardType } from "@/app/types/startup";
import Loading from "@/app/components/ui/custom/loading";

const SpecialistRecommendations = () => {
  const [startups, setStartups] = useState<StartupSpecCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await authenticatedRequest<StartupSpecCardType[]>(
          "/startups/recommendations/",
          "get"
        );
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
        <ul className="">
          {startups.map((startup) => (
            <StartupCard key={startup.id} {...startup} />
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

export default SpecialistRecommendations;

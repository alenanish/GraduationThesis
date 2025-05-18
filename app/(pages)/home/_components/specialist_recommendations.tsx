"use client";
import React, { useState, useEffect } from "react";
import StartupCard from "@/app/components/ui/card/startup_card_specialist";
import { authenticatedRequest } from "@/app/utils/api";
import { StartupCardType } from "@/app/types/startup";

const SpecialistRecommendations = () => {
  const [startups, setStartups] = useState<StartupCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<StartupCardType[]>(
          "/search/startups/",
          "get"
        );
        setStartups(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке стартапов.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка стартапов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h2>Рекомендованные стартапы:</h2>
      {startups.length > 0 ? (
        <ul>
          {startups.map((startup) => (
            <StartupCard key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <div>Нет рекомендованных стартапов.</div>
      )}
    </div>
  );
};

export default SpecialistRecommendations;

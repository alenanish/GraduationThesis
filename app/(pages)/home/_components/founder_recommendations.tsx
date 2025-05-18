"use client";
import { SpecialistCard } from "@/app/components/ui";
import { SpecialistCardType } from "@/app/types/specialist";
import { authenticatedRequest } from "@/app/utils/api";
import React, { useState, useEffect } from "react";

const FounderRecommendations = () => {
  const [specialists, setSpecialists] = useState<SpecialistCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<SpecialistCardType[]>(
          "/search/specialists/",
          "get"
        );
        setSpecialists(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке специалистов.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка специалистов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      {specialists.length > 0 ? (
        <ul>
          {specialists.map((specialist) => (
            <SpecialistCard key={specialist.user_id} {...specialist} />
          ))}
        </ul>
      ) : (
        <div>Нет рекомендованных инвесторов.</div>
      )}
    </div>
  );
};

export default FounderRecommendations;

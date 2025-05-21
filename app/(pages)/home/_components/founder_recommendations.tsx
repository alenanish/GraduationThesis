"use client";
import SpecialistsList from "@/app/components/lists/specialists_list";
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
          "specialists/recommendations/",
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
    <>
      <SpecialistsList
        specialists={specialists}
        no_result_text="Пока нет рекомендаций"
      />
    </>
  );
};

export default FounderRecommendations;

"use client";
import SpecialistsList from "@/app/components/lists/specialists_list";
import Loading from "@/app/components/ui/custom/loading";
import { SpecialistCardType } from "@/app/types/specialist";
import { authenticatedRequest } from "@/app/utils/api";
import React, { useState, useEffect } from "react";

const FounderRecommendations = () => {
  const [specialists, setSpecialists] = useState<SpecialistCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await authenticatedRequest<SpecialistCardType[]>(
          "specialists/recommendations/",
          "get"
        );
        setSpecialists(response.data);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке специалистов.");
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
      <SpecialistsList
        specialists={specialists}
        no_result_text="Пока нет рекомендаций"
      />
    </>
  );
};

export default FounderRecommendations;

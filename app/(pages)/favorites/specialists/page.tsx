"use client";
import React, { useState, useEffect } from "react";
import { authenticatedRequest } from "@/app/utils/api";
import Loading from "@/app/components/ui/custom/loading";
import { SpecialistCardType } from "@/app/types/specialist";
import { ErrorMessage } from "@/app/components/ui";
import SpecialistsList from "@/app/components/lists/specialists_list";

const FavoriteSpecialists = () => {
  const [specialists, setSpecialists] = useState<SpecialistCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<SpecialistCardType[]>(
          "/favorites/specialists/",
          "get"
        );
        setSpecialists(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке ибранных специалистов.");
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
    <>
      <h2 className="text-h4 font-medium text-base-900 mb-1">Специалисты</h2>
      <SpecialistsList specialists={specialists} />
    </>
  );
};

export default FavoriteSpecialists;

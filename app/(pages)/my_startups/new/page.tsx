"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/context/auth_context";
import Loading from "@/app/components/ui/custom/loading";
import { authenticatedRequest } from "@/app/utils/api";
import { Invitation, MyStartupType } from "@/app/types/startup";
import NewStartupsSpecList from "./_components/spec_new_startups_list";
import { ErrorMessage } from "@/app/components/ui";

const CurrentStartups = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const [results, setResults] = useState<MyStartupType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await authenticatedRequest<MyStartupType[]>(
          `startups/new-startups/`,
          "get"
        );
        setResults(response.data);
        console.log(response.data);
        const invitations = await authenticatedRequest<Invitation[]>(
          `invitations/`,
          "get"
        );
        console.log(invitations.data);
      } catch (err: any) {
        setError(err.message || "Ошибка при загрузке стартапов.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <div className="space-y-2">
      <h2 className="text-h4 font-medium text-base-900 mb-1">Предложения</h2>
      <NewStartupsSpecList
        startups={results}
        no_result_text={"Пока нет новых предложений"}
      />
    </div>
  );
};

export default CurrentStartups;

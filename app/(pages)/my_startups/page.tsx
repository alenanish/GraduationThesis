"use client";
import React, { useEffect, useState } from "react";

import { useAuth } from "@/app/context/auth_context";
import Loading from "@/app/components/ui/custom/loading";
import { useRouter } from "next/navigation";
import { authenticatedRequest } from "@/app/utils/api";
import { MyStartupType, StartupCardType } from "@/app/types/startup";
import { Button } from "@/app/components/ui";
import StartupsFoundList from "@/app/components/lists/startups_found_list";
import CurStartupsSpecList from "./_components/spec_current_startups_list";

const CurrentStartups = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();

  const role = user?.role;

  const [results, setResults] = useState<MyStartupType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await authenticatedRequest<MyStartupType[]>(
          `/startups/my-startups/`,
          "get"
        );
        setResults(response.data);
        console.log(response.data);
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

  if (!user) {
    router.replace("/");
  }

  if (!(user?.role === "startup" || user?.role === "specialist")) {
    useRouter().replace("/not-found");
  }

  return (
    <div className="w-full pt-1">
      {role === "startup" ? (
        <div className="space-y-2">
          <div className="flex flex-row justify-between">
            <h2 className="text-h4 font-medium text-base-900 mb-1">Стартапы</h2>
            <div
              onClick={() => {
                router.push("/startups/new");
              }}
            >
              <Button type="button" size="s">
                Новый стартап
              </Button>
            </div>
          </div>

          <StartupsFoundList
            startups={results}
            no_result_text={"Нет актуальных стартапов"}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-h4 font-medium text-base-900 mb-1">Стартапы</h2>
          <CurStartupsSpecList
            startups={results}
            no_result_text={"Нет актуальных стартапов"}
          />
        </div>
      )}
    </div>
  );
};

export default CurrentStartups;

"use client";
import React, { useEffect, useState } from "react";

import { authenticatedRequest } from "@/app/utils/api";
import { User } from "@/app/types/user";
import FounderProfile from "./_roles/founder_profile";
import InvestorProfile from "./_roles/investor_profile";
import SpecialistProfile from "./_roles/specialist_profile";
import { use } from "react";
import Loading from "@/app/components/ui/custom/loading";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: Promise<{ user_id: number }>;
}) {
  const { user_id } = use(params);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<User>(
          `/profile/${user_id}/`,
          "get"
        );
        console.log(response.data);
        setUser(response.data);
        if (user_id === response.data.user_id) {
          router.replace("/profile/me");
        }
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке пользователя.");
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

  if (!user) {
    return;
  }

  return (
    <div className="w-full pt-1">
      {user.role === "startup" ? (
        <FounderProfile user_id={user_id} />
      ) : user.role === "investor" ? (
        <InvestorProfile user_id={user_id} />
      ) : user.role === "specialist" ? (
        <SpecialistProfile user_id={user_id} />
      ) : (
        <p>Неизвестная роль пользователя.</p>
      )}
    </div>
  );
}

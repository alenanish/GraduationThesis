"use client";

import { User } from "@/app/types/user";
import { useState, useEffect, use } from "react";
import DialogHeader from "../_components/dialog/dialog_header";
import { authenticatedRequest } from "@/app/utils/api";
import MessageDisplay from "../_components/dialog/message_display";
import MessageInput from "../_components/dialog/message_input";
import { ErrorMessage } from "@/app/components/ui";

export default function Dialog({
  params,
}: {
  params: Promise<{ user_id: number }>;
}) {
  const { user_id } = use(params);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await authenticatedRequest<User>(
          `/profile/${user_id}/`,
          "get"
        );
        if (response.data) {
          setUser(response.data);
        } else {
          throw new Error("User data not found.");
        }
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user_id]);

  if (!user) return;

  return (
    <div className="h-[calc(100vh-72px)] flex flex-col w-full relative">
      <DialogHeader otherUser={user} />
      {error && (
        <ErrorMessage
          onClose={() => {
            setError(null);
          }}
        >
          {error}
        </ErrorMessage>
      )}
      {!isLoading && user && <MessageDisplay otherUserId={user.user_id} />}
      <MessageInput recipient_id={user_id} />
    </div>
  );
}

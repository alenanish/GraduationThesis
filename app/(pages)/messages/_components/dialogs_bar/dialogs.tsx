"use client";
import { MessageType } from "@/app/types/message";
import { useEffect, useState } from "react";
import { authenticatedRequest } from "@/app/utils/api";
import DialogItem from "./dialog_item";
import Loading from "@/app/components/ui/custom/loading";
import { ErrorMessage } from "@/app/components/ui";

async function fetchDialogs(): Promise<MessageType[]> {
  const list = await authenticatedRequest<MessageType[]>(
    "/messages/dialogs/",
    "get"
  );
  if (list.data) {
    return list.data;
  }
  throw new Error("Failed to fetch dialogs");
}

function Dialogs() {
  const [dialogs, setDialogs] = useState<MessageType[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDialogs = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDialogs();
        setDialogs(data);
        console.log(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching dialogs:", err);
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDialogs();
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
    <div className="fixed w-1/3 bg-base-0 rounded-[16px] h-[calc(100vh-72px)] flex-grow flex-col gap-1 p-1 ">
      {dialogs.map((dialog) => (
        <DialogItem key={dialog.id} dialogItem={dialog} />
      ))}
    </div>
  );
}

export default Dialogs;

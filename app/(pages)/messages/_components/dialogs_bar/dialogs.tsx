"use client";
import { MessageType } from "@/app/types/message";
import { useEffect, useState } from "react";
import { authenticatedRequest } from "@/app/utils/api";
import DialogItem from "./dialog_item";
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

  useEffect(() => {
    const loadDialogs = async () => {
      try {
        const data = await fetchDialogs();
        setDialogs(data);
        console.log(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching dialogs:", err);
        setError(err?.message || "Ошибка при загрузке.");
      }
    };

    loadDialogs();
  }, []);

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
      {dialogs ? (
        dialogs.map((dialog) => (
          <DialogItem key={dialog.id} dialogItem={dialog} />
        ))
      ) : (
        <p>У вас пока нет диалогов</p>
      )}
    </div>
  );
}

export default Dialogs;

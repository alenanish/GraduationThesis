import React, { useEffect, useState } from "react";
import { MessageType } from "@/app/types/message";
import SingleMessage from "./message";
import { authenticatedRequest } from "@/app/utils/api";
import Loading from "@/app/components/ui/custom/loading";

interface MessageDisplayProps {
  otherUserId: number;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ otherUserId }) => {
  const isMyMessage = (message: MessageType): boolean => {
    return message.sender.user_id !== otherUserId;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const messagesResponse = await authenticatedRequest<MessageType[]>(
          `/messages/${otherUserId}/`,
          "get"
        );

        if (messagesResponse.data) {
          setMessages(messagesResponse.data);
        } else {
          throw new Error("Messages data not found.");
        }
        console.log(messagesResponse.data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.message || "Ошибка при загрузке.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [otherUserId]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-16 mb-12 space-y-2 flex-grow overflow-y-auto">
      {messages.map((message) => (
        <SingleMessage
          key={message.id}
          message={message}
          isMyMessage={isMyMessage(message)}
        />
      ))}
    </div>
  );
};

export default MessageDisplay;

import { Send } from "@/app/components/icons";
import { IconButton } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import { authenticatedRequest } from "@/app/utils/api";
import React, { useState, useCallback, useRef, useEffect } from "react";

interface MessageInputProps {
  recipient_id: number;
}

interface MessageToSend {
  recipient_id: number;
  text: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ recipient_id }) => {
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageText(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 275);
      textAreaRef.current.style.height = `${newHeight}px`;
      setTextAreaHeight(`${newHeight}px`);
    }
  }, [messageText]);

  const sendMessageToServer = useCallback(
    async (messageText: string) => {
      setIsLoading(true);
      setError(null);

      const newMessage: MessageToSend = {
        text: messageText,
        recipient_id: recipient_id,
      };

      try {
        const response = await authenticatedRequest<MessageToSend>(
          "/messages/",
          "post",
          newMessage
        );

        if (!response.data) {
          throw new Error("Failed to send message.");
        }

        setMessageText("");
        if (textAreaRef.current) {
          textAreaRef.current.style.height = "auto";
        }
        setTextAreaHeight("auto");
      } catch (error: any) {
        console.error("Error sending message:", error);
        setError(error?.message || "Failed to send message.");
      } finally {
        setIsLoading(false);
      }
    },
    [recipient_id]
  );

  const handleSendMessage = useCallback(() => {
    if (messageText.trim() !== "") {
      sendMessageToServer(messageText.trim());
    }
  }, [messageText, sendMessageToServer]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        if (event.ctrlKey || event.metaKey) {
          setMessageText((prevText) => prevText + "\n");
        } else {
          event.preventDefault();
          handleSendMessage();
        }
      }
    },
    [handleSendMessage]
  );

  return (
    <div className="absolute bottom-0 rounded-[16px] w-full flex items-center justify-center pl-3 py-1 pr-1 bg-base-0 gap-2">
      <textarea
        ref={textAreaRef}
        className="flex-grow focus:outline-none resize-none placeholder:text-body-s placeholder:italic placeholder:text-base-300 focus:placeholder:text-transparent text-body-s font-medium text-color-700"
        placeholder="Написать сообщение"
        value={messageText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={{ height: textAreaHeight, maxHeight: "275px" }}
        rows={1}
        disabled={isLoading}
      />
      <IconButton
        variant="tertiary"
        size="s"
        color="prime"
        onClick={handleSendMessage}
        disabled={messageText.trim() === "" || isLoading}
      >
        {isLoading ? <Loading size={24} /> : <Send size={24} />}
      </IconButton>
    </div>
  );
};

export default MessageInput;

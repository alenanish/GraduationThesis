"use client";
import { Check, CheckAll, DefaultAccount } from "@/app/components/icons";
import { ErrorMessage } from "@/app/components/ui";
import { useAuth } from "@/app/context/auth_context";
import { MessageType } from "@/app/types/message";
import { User } from "@/app/types/user";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface DialogItemProps {
  dialogItem: MessageType;
  onClick?: () => void;
}

function formatTimestampToHHMM(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "XX:XX";
  }
}

const DialogItem: React.FC<DialogItemProps> = ({ dialogItem }) => {
  const { user } = useAuth();
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const findOtherUser = async () => {
      setError(null);
      try {
        if (user) {
          const other =
            dialogItem.sender.user_id === user.user_id
              ? dialogItem.recipient
              : dialogItem.sender;
          setOtherUser(other);
        }
      } catch (err: any) {
        console.error("Error getting other user:", err);
        setError(err?.message || "Failed to determine other user.");
      } finally {
      }
    };

    findOtherUser();
  }, [user, dialogItem]);

  if (error || !user || !otherUser) {
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

  const isSender = dialogItem.sender.user_id === user.user_id;

  return (
    <div
      onClick={() => {
        router.push(`/messages/${otherUser.user_id}`);
      }}
      className="flex items-center p-2 cursor-pointer bg-base-0 hover:bg-prime-100 rounded-[8px] w-full"
    >
      <div className="w-12 h-12 rounded-[16px] mr-2 overflow-hidden flex items-center justify-center">
        {otherUser.avatar ? (
          <img
            src={otherUser.avatar}
            alt={`Аватар ${otherUser.full_name}`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <DefaultAccount size={40} color="var(--color-prime-500)" />
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-body-m font-medium text-base-800">
          {otherUser.full_name}
        </h3>
        <p className="text-body-s text-base-600 truncate max-w-[270px]">
          {dialogItem.text}
        </p>
      </div>
      <div className="">
        <span className="text-xs text-gray-500 ml-auto">
          {formatTimestampToHHMM(dialogItem.timestamp)}
        </span>
        {isSender ? (
          dialogItem.is_read ? (
            <CheckAll size={20} color="var(--color-prime-500)" />
          ) : (
            <Check size={20} color="var(--color-base-300)" />
          )
        ) : null}
      </div>
    </div>
  );
};

export default DialogItem;

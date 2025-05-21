import { Check, CheckAll, DefaultAccount } from "@/app/components/icons";
import { MessageType } from "@/app/types/message";

interface SingleMessageProps {
  message: MessageType;
  isMyMessage: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  message,
  isMyMessage,
}) => {
  const renderAvatar = (message: MessageType) => {
    if (message.sender.avatar) {
      return (
        <img
          src={message.sender.avatar}
          alt={`Аватар ${message.sender.full_name}`}
          className="w-5 h-5 object-cover rounded-full"
        />
      );
    } else {
      return <DefaultAccount size={20} color="var(--color-prime-500)" />;
    }
  };

  const renderMessageContent = (message: MessageType) => {
    return (
      <div className="max-w-2/3 min-w-fit text-wrap whitespace-pre-wrap bg-base-0 rounded-[16px] p-2 text-body-s text-base-800 ">
        <p>{message.text}</p>
        <span className="flex w-full justify-end">{isMyMessage && isRead(message.is_read)}</span>
      </div>
    );
  };

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

  function isRead(is_read: boolean): React.ReactNode {
    if (is_read) {
      return <CheckAll size={14} color="var(--color-prime-500)" />;
    } else {
      return <Check size={14} color="var(--color-base-300)" />;
    }
  }
  return (
    <div
      key={message.id}
      className={`flex flex-col w-full  ${
        isMyMessage ? "items-end" : "items-start"
      }`}
    >
      <div className="flex flex-row gap-x-1">
        {!isMyMessage && <div className="w-5 h-5">{renderAvatar(message)}</div>}
        {renderMessageContent(message)}
        {isMyMessage && <div className="w-5 h-5">{renderAvatar(message)}</div>}
      </div>
      <span
        className={`flex flex-row ${
          isMyMessage ? "mr-6" : "ml-6"
        }  text-caption text-base-300`}
      >
        {formatTimestampToHHMM(message.timestamp)}
      </span>
    </div>
  );
};

export default SingleMessage;

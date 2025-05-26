"use client";
import { DefaultAccount, More } from "@/app/components/icons";
import { DropDownMenu, ErrorMessage } from "@/app/components/ui";
import InviteModal from "@/app/components/ui/custom/invite_modal";
import { useAuth } from "@/app/context/auth_context";
import { User } from "@/app/types/user";
import { authenticatedRequest } from "@/app/utils/api";
import Link from "next/link";
import { useState } from "react";

interface DialogHeaderProps {
  otherUser: User;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({ otherUser }) => {
  const { user } = useAuth();
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!otherUser) return;

  const handleDelete = async () => {
    try {
      await authenticatedRequest(`/messages/${otherUser.user_id}/`, "delete");
    } catch (e) {
      setError("Ошибка при удалении переписки");
    }
  };

  const handleOpenInvite = () => {
    setInviteModalOpen(true);
  };

  const handleInvite = (startupId: number, vacancyId: number) => {
    authenticatedRequest("/invitations/", "post", {
      user_id: otherUser?.user_id,
      required_specialist_id: vacancyId,
    })
      .then(() => {
        setInviteModalOpen(false);
      })
      .catch(() => {
        alert("Ошибка при отправке приглашения");
      });
  };

  const menuItems1 = [
    {
      label: "Пригласить в стартап",
      onClick: handleOpenInvite,
    },
    {
      label: "Удалить",
      onClick: handleDelete,
      color: "red",
    },
  ];
  const menuItems2 = [
    {
      label: "Удалить",
      onClick: handleDelete,
      color: "red",
    },
  ];

  const menuDropDown = () => {
    const options =
      user?.role === "startup" && otherUser?.role === "specialist"
        ? menuItems1
        : menuItems2;

    return (
      <DropDownMenu
        icon={<More />}
        options={options}
        position="left"
        variant="tertiary"
      />
    );
  };

  return (
    <>
      <div className="absolute top-0 bo z-10 bg-base-0 rounded-[16px] p-2  flex w-full items-center gap-2 justify-between">
        <div className="flex items-center">
          {otherUser && (
            <>
              <div className="w-10 h-10 rounded-full mr-2 text-prime-500">
                {otherUser.avatar ? (
                  <Link href={`/profile/${otherUser.user_id}`} passHref>
                    <img
                      src={otherUser.avatar}
                      alt={`Avatar of ${otherUser.full_name}`}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </Link>
                ) : (
                  <Link href={`/profile/${otherUser.user_id}`} passHref>
                    <DefaultAccount size={40} />
                  </Link>
                )}
              </div>
              <h2 className="text-body-m font-medium text-base-800">
                {otherUser.full_name}
              </h2>
            </>
          )}
        </div>

        <div className="flex flex-row gap-1">{menuDropDown()}</div>
      </div>

      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        onInvite={handleInvite}
      />

      {error && (
        <ErrorMessage
          onClose={() => {
            setError(null);
          }}
        >
          {error}
        </ErrorMessage>
      )}
    </>
  );
};

export default DialogHeader;

import React from "react";
import { authenticatedRequest } from "@/app/utils/api";
import { Button } from "@/app/components/ui";

interface InvitationButtonsProps {
  invitation_id: number;
}

const InvitationButtons: React.FC<InvitationButtonsProps> = ({
  invitation_id,
}) => {
  const handleAccept = async (id: number) => {
    try {
      const response = await authenticatedRequest(
        `/invitations/${id}/accept/`,
        "post",
        id
      );
      console.log("Приглашение принято:", response.data);
    } catch (error) {
      console.error("Ошибка при принятии приглашения:", error);
    }
  };

  const handleRefuse = async (id: number) => {
    try {
      const response = await authenticatedRequest(
        `/invitations/${id}/decline/`,
        "post",
        id
      );
      console.log("Приглашение отклонено:", response.data);
    } catch (error) {
      console.error("Ошибка при отклонении приглашения:", error);
    }
  };

  return (
    <div className="flex flex-row gap-x-2">
      <Button onClick={() => handleAccept(invitation_id)}>Принять</Button>
      <Button color="base" onClick={() => handleRefuse(invitation_id)}>
        Отклонить
      </Button>
    </div>
  );
};

export default InvitationButtons;

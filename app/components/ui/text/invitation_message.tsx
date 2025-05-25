"use client";
import React, { ReactNode } from "react";
interface SuccessNotificationProps {
  children?: ReactNode;
  onClose: () => void;
  duration?: number;
}

const InvitationMessage: React.FC<SuccessNotificationProps> = ({

}) => {
  return (
    <div
      className={`fixed bottom-2 left-0 z-50 flex items-center border-2 bg-green-50 border-green-700 rounded-[16px] py-3 px-2 w-fit min-w-[260px]`}
    >
        <p>Вы приглашены в {startup.title}</p>
        <p>Вас пригласили присоединиться к стартапу в роли {profession.name}</p>
        <p>Чтобы принять приглашение, перейдите на экран <Link>Мои стартапы</Link></p>
    </div>
  );
};

export default InvitationMessage;

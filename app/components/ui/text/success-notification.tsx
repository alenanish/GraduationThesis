"use client";
import React, { ReactNode } from "react";
import IconButton from "../button/icon-button";
import { Close } from "../../icons";

interface SuccessNotificationProps {
  children?: ReactNode;
  onClose: () => void;
  duration?: number;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  children,
  onClose,
}) => {
  return (
    <div
      className={`fixed bottom-2 left-0 z-50 flex items-center border-2 bg-green-50 border-green-700 rounded-[16px] py-3 px-2 w-fit min-w-[260px]`}
    >
      <label className="w-full text-body-s italic text-center text-base-700">
        {children}
      </label>
      <IconButton
        size="s"
        variant="tertiary"
        color="green"
        onClick={onClose}
        className="ml-2 text-green"
      >
        <Close />
      </IconButton>
    </div>
  );
};

export default SuccessNotification;

"use client";
import React, { ReactNode, useState } from "react";
import IconButton from "../button/icon-button";
import { Close } from "../../icons";

interface ErrorMessageProps {
  children?: ReactNode;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div
        className={`flex border-2 bg-red-50 border-red-700 rounded-[32px] py-3 px-2 w-fit min-w-[260px] absolute transition-transform duration-200 ${
          isHovered ? "scale-105" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <label className="w-full text-body-s italic text-center text-base-700">
          {children}
        </label>
        <IconButton
          size="s"
          variant="tertiary"
          color="red"
          onClick={onClose}
          className="ml-2 text-red"
        >
          <Close />
        </IconButton>
      </div>
    </div>
  );
};

export default ErrorMessage;

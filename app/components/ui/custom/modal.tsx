import React from "react";
import IconButton from "../button/icon-button";
import { Close } from "../../icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  if (!isOpen) return null;
  return (
    <div className=" fixed z-50 inset-0 bg-prime-100 flex items-center justify-center">
      <div
        className={`${className} bg-base-0 rounded-[16px] p-4 text-base-900 flex flex-col gap-y-2 relative`}
      >
        <div className="flex flex-row justify-between items-center">
          {title && <h2 className="text-h5 font-medium">{title}</h2>}
          <IconButton onClick={onClose} variant="tertiary" size="s">
            <Close />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

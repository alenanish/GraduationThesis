"use client";
import React from "react";
import Modal from "../custom/modal";
import Button from "./button";

interface ConfirmActionProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  message: string;
  isOpen: boolean;
}

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  onConfirm,
  onCancel,
  message,
  isOpen,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onCancel();
    } catch (error) {
      console.error("Ошибка при подтверждении действия", error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal title="Подтверждение действия" isOpen={isOpen} onClose={onCancel}>
      <p className="mb-4 text-base-600 text-body-m">{message}</p>
      <div className="flex gap-2 ">
        <Button
          variant='tertiary'
          color="base"
          onClick={handleConfirm}
        >
          Подтвердить
        </Button>
        <Button
          color='base'
          onClick={onCancel}
        >
          Отменить
        </Button>
        
      </div>
    </Modal>
  );
};

export default ConfirmAction;

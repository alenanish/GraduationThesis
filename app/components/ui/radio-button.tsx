import React, { useState } from "react";
import { RadioboxBlank, RadioboxMarked } from "../icons";

interface RadioButtonProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  checked,
  onChange,
  disabled = false,
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  return (
    <div
      className={`flex items-start space-x-1 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleChange}
    >
      <div className="flex items-center h-5 transition-all">
        {checked ? (
          <RadioboxMarked color="#0094C8" />
        ) : (
          <RadioboxBlank color="#5d5d5d" />
        )}
      </div>
      <label
        className={`text-body-s  ${
          disabled ? "text-base-500" : "text-base-800"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;

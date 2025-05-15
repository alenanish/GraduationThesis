"use client";
import React, { useState } from "react";
import { RadioboxBlank, RadioboxMarked } from "../../icons";

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
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const radioColor = isHovered
    ? "var(--color-prime-600)"
    : "var(--color-prime-500)";
  const blankColor = isHovered
    ? "var(--color-base-800)"
    : "var(--color-base-500)";

  return (
    <div
      className={`flex items-start space-x-1 ${
        disabled ? "cursor-not-allowed " : "cursor-pointer"
      }`}
      onClick={handleChange}
      onMouseEnter={disabled ? undefined : handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
    >
      <div className="flex items-center h-5 transition-all">
        {checked ? (
          <RadioboxMarked color={radioColor} />
        ) : (
          <RadioboxBlank color={blankColor} />
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

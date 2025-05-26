"use client";
import React, { useState } from "react";
import RadioButton from "./radio-button";

interface RadioGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioGroupOption[];
  name?: string;
  onChange: (value: string) => void;
  value?: string;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onChange,
  value,
  className
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleRadioButtonChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={className? className: "space-y-4 w-fit"}>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={handleRadioButtonChange}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

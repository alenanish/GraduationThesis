"use client";
import React, { useState, FC, useCallback } from "react";
import Checkbox from "./checkbox";

interface CheckboxGroupProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  const [checkedValues, setCheckedValues] = useState(selectedValues);

  const handleCheckboxChange = useCallback(
    (value: string, checked: boolean) => {
      let newCheckedValues = [...checkedValues];
      if (checked) {
        newCheckedValues.push(value);
      } else {
        newCheckedValues = newCheckedValues.filter((v) => v !== value);
      }
      setCheckedValues(newCheckedValues);
      onChange(newCheckedValues);
    },
    [checkedValues, onChange]
  );

  return (
    <div className="space-y-2 w-fit">
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          value={option.value}
          checked={checkedValues.includes(option.value)}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;

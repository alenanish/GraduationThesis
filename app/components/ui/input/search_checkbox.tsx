"use client";
import React, { useState, FC, useCallback, useEffect } from "react";
import Checkbox from "./checkbox";
import Input from "./input";

interface CheckboxGroupProps {
  options: { name: string; id: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "",
}) => {
  const [checkedValues, setCheckedValues] = useState(selectedValues);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

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
    <div className="flex flex-col space-y-2 w-full min-h-40 grow overflow-y-auto">
      <Input
        id="skills"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <div className="flex flex-col space-y-2 w-full h-40 overflow-y-auto">
        {filteredOptions.map((option) => (
          <Checkbox
            key={option.id}
            name={option.name}
            id={option.id}
            checked={checkedValues.includes(option.id)}
            onChange={handleCheckboxChange}
          />
        ))}

        {filteredOptions.length === 0 && searchTerm !== "" && (
          <div className="text-red-500">Ничего не найдено.</div>
        )}
      </div>
    </div>
  );
};

export default CheckboxGroup;

// RadioGroup.tsx
import React, { useState } from 'react';
import RadioButton from './radio-button';


interface RadioGroupOption {
    label: string;
    description?: string;
    value: string;
    disabled?: boolean
}

interface RadioGroupProps {
    options: RadioGroupOption[];
    name: string;
    onChange: (value: string) => void;
    value?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, name, onChange, value }) => {
    const [selectedValue, setSelectedValue] = useState(value || "");

    const handleRadioButtonChange = (value: string) => {
      setSelectedValue(value);
      onChange(value);
    };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          name={name}
          checked={selectedValue === option.value}
          onChange={handleRadioButtonChange}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
};

export default RadioGroup;

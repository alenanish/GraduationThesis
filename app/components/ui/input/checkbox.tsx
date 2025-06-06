import React, { useState, FC, useCallback } from "react";
import { CheckboxBlank, CheckboxMarked } from "../../icons";

interface CheckboxProps {
  name: string;
  id: string;
  checked?: boolean;
  onChange?: (value: string, checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  name,
  id,
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = useCallback(() => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(id, newChecked);
    }
  }, [isChecked, id, onChange]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const checkboxColor = isHovered
    ? "var(--color-prime-600)"
    : "var(--color-prime-500)";
  const blankColor = isHovered
    ? "var(--color-base-800)"
    : "var(--color-base-500)";

  return (
    <div
      className="flex items-start space-x-1 cursor-pointer"
      onClick={handleChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isChecked ? (
        <CheckboxMarked color={checkboxColor} />
      ) : (
        <CheckboxBlank color={blankColor} />
      )}
      <label className="text-body-s text-base-800">{name}</label>
    </div>
  );
};

export default Checkbox;

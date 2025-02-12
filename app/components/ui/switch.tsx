import React from "react";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Circle: React.FC<{ checked: boolean; disabled: boolean }> = ({ checked, disabled }) => {
  const circleStyle = {
    transform: checked ? 'translateX(16px)' : 'translateX(0)',

  };

  return (
    <span className={`inline-block h-5 w-5 rounded-full bg-base-0 transform transition-transform duration-200 ease-in-out `} style={circleStyle}></span>
  );
};


const Switch: React.FC<SwitchProps> = ({
  label,
  checked = false,
  disabled = false,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      if (onChange) {
        onChange(e.target.checked);
      }
    }
  };

  return (
    <label
      className={`inline-flex items-center gap-x-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
        disabled={disabled} 
      />
      <span
        className={`text-body-s ${
          disabled ? "text-base-500" : "text-base-800"
        }`}
      >
        {label}
      </span>

      <span className={`px-0.5 relative inline-flex items-center h-6 w-10 rounded-full transition-colors duration-200 ${disabled ? (checked ? 'bg-base-200' : 'bg-base-100') : (checked ? 'bg-prime-600' : 'bg-base-300')}`}>
        <Circle checked={checked} disabled={disabled} />
      </span>
    </label>
  );
};

export default Switch;

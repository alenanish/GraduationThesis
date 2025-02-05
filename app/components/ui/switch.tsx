import React from "react";

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

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
      />
      <label
        className={`text-body-s ${
          disabled ? "text-base-500" : "text-base-800"
        }`}
      >
        {label}
      </label>
      {!disabled ? (
        <div className="relative w-10 h-6 peer-focus:outline-hidden rounded-full peer  bg-base-300 peer-checked:after:translate-x-4 peer-checked:rtl:after:-translate-x-4 peer-checked:after:border-base-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-base after:border-base-0 after:border-[10px] after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-prime-500"></div>
      ) : (
        <div className="relative w-10 h-6 peer-focus:outline-hidden rounded-full peer  bg-base-100 peer-checked:after:translate-x-4 peer-checked:rtl:after:-translate-x-4 peer-checked:after:border-base-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-base after:border-base-0 after:border-[10px] after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-base-200"></div>
      )}
    </label>
  );
};

export default Switch;

import React from 'react';

interface SwitchProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?:  boolean;
}

const Switch: React.FC<SwitchProps> = ({ label, checked = false, disabled = false, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
        if (onChange) {
        onChange(e.target.checked);
        }
    }
  };

  return (
    <label className={`inline-flex items-center gap-x-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={handleChange}
      />
      <label className={`text-body-s ${disabled ? 'text-white-500' : 'text-white-800'}`}>{label}</label>
      {!disabled ? 
      <div className="relative w-10 h-6 peer-focus:outline-none rounded-full peer  bg-white-300 peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-checked:after:border-white-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white-0 after:border-[10px] after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-500"></div>:
      <div className="relative w-10 h-6 peer-focus:outline-none rounded-full peer  bg-white-100 peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4 peer-checked:after:border-white-0 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white-0 after:border-[10px] after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-white-200"></div> }
      
    </label>
  );
};

export default Switch;


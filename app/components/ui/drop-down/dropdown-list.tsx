"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowDown, ArrowUp } from "../../icons";

interface DropdownOption {
  id: string | number;
  name: string;
}

interface DropdownProps {
  id: string;
  label?: string;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  value?: number | string;
  placeholder?: string;
  border?: boolean;
  disabled?: boolean;
  required?: boolean;
  errorText?: string | null;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  value,
  border = true,
  disabled = false,
  placeholder = "Выберите значение",
  errorText,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    () => {
      if (value) {
        const foundOption = options.find((option) => option.id === value);
        return foundOption ? { name: foundOption.name, id: value } : null;
      }
      return null;
    }
  );
  const handleOptionClick = (option: DropdownOption) => {
    onChange(option);
    setSelectedOption({ id: option.id, name: option.name });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full min-w-56 relative inline-block text-left "
      ref={dropdownRef}
    >
      <div>
        <label
          className={`${isOpen ? "text-prime-500" : "text-base-400"} 
          " text-body-s  mb-2`}
        >
          {label}
          {required && (
            <span
              className="text-red-600 ml-0.5"
              title="Обязательное поле"
              aria-label="Обязательное поле."
            >
              *
            </span>
          )}
        </label>
        <button
          type="button"
          className={`${
            border
              ? !disabled
                ? "border-2 border-base-200"
                : "border-2 border-base-100"
              : "border-none"
          } 
          ${
            disabled
              ? "text-base-200 cursor-not-allowed font-medium"
              : selectedOption
              ? "text-base-800 font-medium"
              : "text-base-400 italic"
          } 
         
          transition-all  duration-150 inline-flex justify-between items-center w-full rounded-[32px] h-11 
          px-4 py-3 bg-base-0 text-body-s focus-within:border-prime-500 focus-within:bg-base-0 hover:border-prime-200 hover:bg-prime-100`}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <p className="truncate">
            {selectedOption ? selectedOption.name : placeholder}
          </p>

          {isOpen ? (
            <ArrowUp size={20} color="var(--color-base-500)" />
          ) : (
            <ArrowDown
              size={20}
              color={
                disabled ? "var(--color-base-100)" : "var(--color-base-500)"
              }
            />
          )}
        </button>
        {errorText && (
          <p className="text-body-s bottom-[-20] absolute  text-red-500 mt-1">
            {errorText}
          </p>
        )}
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute overflow-visible left-0 mt-1 w-full z-40 rounded-[8px] bg-base-0 active:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className=" py-1 max-h-[180px] overflow-auto" role="none">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className=" truncate text-base-800 h-[35px] flex flex-row items-center w-full text-left p-2 gap-2 rounded-[8px] text-body-m font-medium hover:bg-prime-100  active:outline-none active:bg-prime-200 active:text-base-900"
              role="menuitem"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

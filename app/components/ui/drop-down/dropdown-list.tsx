"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowDown, ArrowUp } from "../../icons";

interface DropdownOption {
  id: number;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onChange: (id: number) => void;
  value?: number;
  placeholder?: string;
  border?: boolean;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  value,
  border = true,
  disabled = false,
  placeholder = "Выберите значение",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>(() => {
    if (value) {
      const foundOption = options.find((option) => option.id === value);
      return foundOption ? foundOption.label : placeholder;
    }
    return placeholder;
  });

  const handleOptionClick = (option: DropdownOption) => {
    onChange(option.id);
    setSelectedLabel(option.label);
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
    <div className="w-full relative inline-block text-left" ref={dropdownRef}>
      <div>
        <label className="text-body-s text-base-600 mb-2">{label}</label>
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
              : selectedLabel
              ? "text-base-800 font-medium"
              : "text-base-400 italic"
          } 
          transition-all duration-150 inline-flex justify-between items-center w-full rounded-[32px] h-11 
          px-4 py-3 bg-base-0 text-body-m `}
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedLabel}
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
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute left-0 mt-2 w-full rounded-[8px] bg-base-0  active:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1 max-h-[260px] overflow-auto" role="none">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="text-base-800 h-[35px] flex flex-row items-center w-full text-left p-2 gap-2 rounded-[8px] text-body-m font-medium hover:bg-prime-100  active:outline-none active:bg-prime-200 active:text-base-900"
              role="menuitem"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

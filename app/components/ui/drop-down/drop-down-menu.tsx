"use client";
import React, { useState, useRef, useEffect } from "react";

import { IconButton, MenuButton } from "@/app/components/ui";
import Link from "next/link";

type Size = "s" | "m";
type Position = "bottom-rigth" | "left" | "right" | "bottom-left";

interface DropDownMenuProps {
  icon: React.ReactNode;

  options: {
    label: string;
    href?: string;
    color?: string | undefined;
    onClick?: () => void;
  }[];
  size?: Size;
  variant?: "primary" | "secondary" | "tertiary";
  position?: Position;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  icon,
  options,
  size = "s",
  position = "bottom-rigth",
  variant = "secondary",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  const getDropdownPositionClasses = () => {
    let baseStyles = "absolute w-[133px] bg-base-0 ";
    switch (position) {
      case "left":
        baseStyles += "-top-0.5 ";
        if (size === "s") {
          baseStyles += " right-10 ";
        } else {
          baseStyles += "right-13 ";
        }
        return baseStyles;
      case "right":
        baseStyles += "-top-0.5 ";
        if (size === "s") {
          baseStyles += " left-10 ";
        } else {
          baseStyles += "left-13 ";
        }
        return baseStyles;
      case "bottom-left":
        baseStyles += "origin-top  right-0 ";
        return baseStyles;
      case "bottom-rigth":
      default:
        baseStyles += "origin-top  left-0 ";
        return baseStyles;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative inline-block text-left whitespace-pre-wrap "
      ref={dropdownRef}
    >
      <div>
        <IconButton
          variant={variant}
          size={size}
          type="button"
          onClick={toggleOpen}
        >
          {icon}
        </IconButton>
      </div>

      {isOpen && (
        <div className={getDropdownPositionClasses()}>
          <div className="mt-1 ">
            {options.map((option, index) =>
              option.href ? (
                <Link key={index} href={option.href} passHref>
                  <MenuButton
                    size={size}
                    color={option.color ? option.color : "prime"}
                    className="w-full"
                    onClick={() => handleOptionClick()}
                  >
                    {option.label}
                  </MenuButton>
                </Link>
              ) : (
                <MenuButton
                  size={size}
                  key={index}
                  color={option.color ? option.color : "prime"}
                  className="w-full"
                  onClick={() => handleOptionClick()}
                >
                  {option.label}
                </MenuButton>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;

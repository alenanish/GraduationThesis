"use client";
import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type ButtonSize = "s" | "m";
type ButtonState = "enabled" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  state?: ButtonState;
  color?: "prime" | "base";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const TopBarButton: React.FC<ButtonProps> = ({
  size = "s",
  color = "prime",
  children,
  onClick,
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "rounded-[15px] font-medium flex flex-row items-center justify-center gap-2";

  const colorStyles = () => {
    if (color === "base") {
      return `text-base-700 
          hover:text-base-800
          hover:bg-base-50 
          active:bg-base-100
          active:text-base-900
          disabled:text-base-100
          disabled:bg-transparent`;
    } else {
          return `text-prime-500 
          hover:text-prime-600
          hover:bg-prime-100 
          active:bg-prime-200
          active:text-prime-700
          disabled:text-base-100
          disabled:bg-transparent`;
    }
  };


  const sizeStyles = () => {
    switch (size) {
      case "s":
        return "h-10 text-body-s px-4 py-2 ";
      case "m":
        return "h-[48px] text-body-m px-6 py-1 ";
      default:
        return "px-4 py-2 text-body-m ";
    }
  };

  const stateStyles = () => {
    if (disabled) {
      return "cursor-not-allowed";
    }
  };

  const buttonClasses = [
    baseStyles,
    colorStyles(),
    sizeStyles(),
    stateStyles(),
    className,
  ].join(" ");

  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default TopBarButton;

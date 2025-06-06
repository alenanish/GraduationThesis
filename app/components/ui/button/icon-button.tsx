import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type IconButtonType = "primary" | "secondary" | "tertiary";
type IconButtonSize = "s" | "m" | "l";
type IconButtonState = "enabled" | "disabled";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonType;
  size?: IconButtonSize;
  state?: IconButtonState;
  color?: "prime" | "base" | "red" | "green" | "light-grey";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  variant = "primary",
  size = "m",
  color = "prime",
  children,
  onClick,
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles = "rounded-[16px] flex flex-row justify-center items-center";

  const variantStyles = () => {
    switch (variant) {
      case "primary":
        if (color === "base") {
          return `bg-base-500 
                text-base-0 
                hover:bg-base-800 
                active:bg-base-900 
                disabled:bg-base-100`;
        } else if (color === "light-grey") {
          return `bg-base-300 
              text-base-0 
              hover:bg-base-400 
              focus:bg-base-500 
              disabled:bg-base-100`;
        } else {
          return `bg-prime-500 
              text-base-0 
              hover:bg-prime-600 
              active:bg-prime-700 
              disabled:bg-base-100`;
        }
      case "secondary":
        if (color === "base") {
          return `text-base-500
              border-2
              border-base-500
              hover:text-base-800
              hover:border-base-800
              active:border-base-900
              active:text-base-900
              disabled:border-base-100
              disabled:text-base-100 `;
        } else {
          return `text-prime-500
              border-2
              border-prime-500
              hover:text-prime-600
              hover:border-prime-600
              active:border-prime-700
              active:text-prime-700
              disabled:border-base-100
              disabled:text-base-100 `;
        }
      case "tertiary":
        if (color === "base") {
          return `text-base-500 
            hover:text-base-800
            hover:bg-base-50 
            active:bg-base-100
            active:text-base-700
            disabled:text-base-100`;
        } else if (color === "red") {
          return `text-red-500 
                hover:text-red-600
                hover:bg-red-100 
                active:bg-red-200
                active:text-red-700
                disabled:text-base-100
                disabled:bg-transparent`;
        } else if (color === "green") {
          return `text-green-500 
                hover:text-green-600
                hover:bg-green-100 
                active:bg-green-200
                active:text-green-700
                disabled:text-base-100
                disabled:bg-transparent`;
        } else {
          return `text-prime-500 
            hover:text-prime-600
            hover:bg-prime-100 
            active:bg-prime-200
            active:text-prime-700
            disabled:text-base-100
            disabled:hover:bg-transparent `;
        }
      default:
        return `bg-prime-500 
              text-base-0 
              hover:bg-prime-600 
              active:bg-prime-700 
              disabled:bg-base-100`;
    }
  };

  const sizeStyles = () => {
    switch (size) {
      case "s":
        return `h-[40px] w-[40px] ${
          variant === "secondary" ? "p-[6px]" : "p-2"
        }`;
      case "m":
        return `h-[52px] w-[52px] ${
          variant === "secondary" ? "p-[8px]" : "p-[10px]"
        }`;
      case "l":
        return `h-[108px] w-[px] ${
          variant === "secondary" ? "p-[8px]" : "p-[10px]"
        }`;
      default:
        return "h-[52px] w-[52px] p-[10px]";
    }
  };

  const stateStyles = () => {
    if (disabled) {
      return "cursor-not-allowed";
    }
  };

  const buttonClasses = [
    baseStyles,
    variantStyles(),
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

export default IconButton;

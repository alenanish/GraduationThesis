import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "s" | "m" | "l";
type ButtonState = "enabled" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  color?: "prime" | "base" | "light-grey" | "red";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "m",
  color = "prime",
  children,
  onClick,
  disabled,
  icon,
  iconPosition,
  className = "",
  ...rest
}) => {
  const baseStyles =
    " text-nowrap font-medium flex flex-row items-center justify-center gap-2 rounded-[32px] content-center ";

  const variantStyles = () => {
    switch (variant) {
      case "primary":
        if (color === "base") {
          return `bg-base-500 
            text-base-0 
            hover:bg-base-600 
            focus:bg-base-700 
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
            focus:bg-prime-700 
            disabled:bg-base-100`;
        }
      case "secondary":
        if (color === "base") {
          return `text-base-500
            border-2
            border-base-500
            hover:text-base-800
            hover:border-base-800
            focus:border-base-900
            focus:text-base-900
            disabled:border-base-100
            disabled:text-base-100 `;
        } else {
          return `text-prime-400
            border-2
            border-prime-400
            hover:text-prime-600
            hover:border-prime-600
            focus:border-prime-700
            focus:text-prime-700
            disabled:border-base-100
            disabled:text-base-100 `;
        }
      case "tertiary":
        if (color === "base") {
          return `text-base-700 
          hover:text-base-800
          hover:bg-base-50 
          focus:bg-base-100
          focus:text-base-900
          disabled:text-base-100`;
        } else if (color === "red") {
          return `text-red-500 
                hover:text-red-600
                hover:bg-red-100 
                active:bg-red-200
                active:text-red-700
                disabled:text-base-100
                disabled:bg-transparent`;
        } else {
          return `text-prime-500 
          hover:text-prime-600
          hover:bg-prime-100 
          focus:bg-prime-200
          focus:text-prime-700
          disabled:text-base-100`;
        }
      default:
        return `bg-prime-500 
            text-base-0 
            hover:bg-prime-600 
            focus:bg-prime-700 
            disabled:bg-base-100`;
    }
  };

  const sizeStyles = () => {
    switch (size) {
      case "s":
        return "h-10 text-body-s px-4 py-2 ";
      case "m":
        return "h-[48px] text-body-m px-6 py-1 ";
      case "l":
        return "h-[70px] text-h4 px-6 py-1 ";
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
      {icon != undefined && iconPosition === "left" && icon}
      {children}
      {icon != undefined && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;

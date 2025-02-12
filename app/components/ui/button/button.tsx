import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonSize = "s" | "m" | "l";
type ButtonState = "enabled" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  color?: "prime" | "base" | "light-grey";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "m",
  state = "enabled",
  color = 'prime',
  children,
  onClick,
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles = "font-medium flex flex-row items-center justify-center gap-2  rounded-[32px] ";

  const variantStyles = () => {
    switch (variant) {
      case "primary":
        if (color === 'prime') {
          return `bg-prime-500 
            text-base-0 
            hover:bg-prime-600 
            focus:bg-prime-700 
            disabled:bg-base-100`;
          } else  if (color === 'base') {
            return `bg-base-500 
            text-base-0 
            hover:bg-base-700 
            focus:bg-base-900 
            disabled:bg-base-100`;
          } else {
            return `bg-base-300 
            text-base-0 
            hover:bg-base-400 
            focus:bg-base-500 
            disabled:bg-base-100`;
          }
      case "secondary":
        if (color === 'prime') {
          return `text-prime-500
            border-2
            border-prime-500
            hover:text-prime-600
            hover:border-prime-600
            focus:border-prime-700
            focus:text-prime-700
            disabled:border-base-100
            disabled:text-base-100 `;
          } else {
            return `text-base-500
            border-2
            border-base-500
            hover:text-base-800
            hover:border-base-800
            focus:border-base-900
            focus:text-base-900
            disabled:border-base-100
            disabled:text-base-100 `;
          }
      case "tertiary":
        if (color === 'prime') {
        return `text-prime-500 
          hover:text-prime-600
          hover:bg-prime-50 
          focus:bg-prime-100
          focus:text-prime-700
          disabled:text-base-100`;
        } else {
          return `text-base-700 
          hover:text-base-800
          hover:bg-base-50 
          focus:bg-base-100
          focus:text-base-900
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
      {children}
    </button>
  );
};

export default Button;

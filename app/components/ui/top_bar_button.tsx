import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type ButtonSize = "s" | "m";
type ButtonType = "top-bar" | "top-bar-menu";
type ButtonState = "enabled" | "pressed" | "hover" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  color?: "prime" | "base";
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const TopBarButton: React.FC<ButtonProps> = ({
  type = "top-bar",
  size = "m",
  state = "enabled",
  color = "prime",
  children,
  onClick,
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles =
    "font-medium flex flex-row items-center justify-center gap-2";

  const colorStyles = () => {
    if (color === "prime") {
      return `text-prime-500 
          hover:text-prime-600
          hover:bg-prime-50 
          focus:bg-prime-100
          focus:text-prime-700
          disabled:text-base-200`;
    } else {
      return `text-base-700 
          hover:text-base-800
          hover:bg-base-50 
          focus:bg-base-100
          focus:text-base-900
          disabled:text-base-200`;
    }
  };

  const typeStyles = () => {
    if (type === "top-bar") {
      return `rounded-[15px]`;
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
    typeStyles(),
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

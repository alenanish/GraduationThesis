import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

type IconButtonType = "primary" | "secondary" | "tertiary";
type IconButtonSize = "s" | "m" | "l";
type IconButtonState = "enabled" | "pressed" | "hover" | "disabled";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: IconButtonType;
  size?: IconButtonSize;
  state?: IconButtonState;
  icon: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = "primary",
  size = "m",
  state = "enabled",
  icon,
  onClick,
  disabled,
  className = "",
  ...rest
}) => {
  const baseStyles = 
    "rounded-[16px] flex flex-row justify-center items-center";

  const typeStyles = () => {
    switch (type) {
      case "primary":
        return `bg-prime-500 
          text-white-0 
          hover:bg-prime-600 
          focus:bg-prime-700 
          disabled:bg-white-200`;
      case "secondary":
        return `text-prime-500
          border-2
          border-prime-500
          hover:text-prime-600
          hover:border-prime-600
          focus:border-prime-700
          focus:text-prime-700
          disabled:border-white-200
          disabled:text-white-200`;
      case "tertiary":
        return `text-prime-500 
          hover:text-prime-600
          hover:bg-prime-50 
          focus:bg-prime-100
          focus:text-prime-700
          disabled:text-white-200`;
      default:
        return `bg-prime-500 
          text-white-0 
          hover:bg-prime-600 
          focus:bg-prime-700 
          disabled:bg-white-200`;
    }
  };

  const sizeStyles = () => {
    switch (size) {
      case "s":
        return `h-[40px] w-[40px] ${type === 'secondary' ? 'p-[6px]' : 'p-2'}`;
      case "m":
        return `h-[52px] w-[52px] ${type === 'secondary' ? 'p-[8px]' : 'p-[10px]'}`;
      case "l":
        return `h-[108px] w-[px] ${type === 'secondary' ? 'p-[8px]' : 'p-[10px]'}`;
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
      {icon}
    </button>
  );
};

export default IconButton;
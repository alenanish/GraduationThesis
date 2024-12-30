import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

type IconButtonType = 'primary' | 'secondary' | 'tertiary';
type IconButtonSize = 'sm' | 'md';
type IconButtonState = 'enabled' | 'pressed' | 'hover' | 'disabled';

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
  type = 'primary',
  size = 'md',
  state = 'enabled',
  icon,
  onClick,
  disabled,
  className = '',
  ...rest
}) => {
  const baseStyles = 'rounded-[16px] inline-flex items-center justify-center py-2 px-3 ';

  const typeStyles = () => {
    switch (type) {
      case 'primary':
        return `bg-blue-500
        text-white-0
        hover:bg-blue-600
        focus:bg-blue-700
        disabled:bg-white-200
        disabled:hover:bg-blue-300`;
      case 'secondary':
        return `text-blue-500
          border
          border-blue-500
          hover:bg-blue-50 
          focus:border-blue-700
          focus:text-blue-700
          disabled:border-white-200
          disabled:text-white-200 
          disabled:hover:bg-white-100`;
      case 'tertiary':
        return `text-blue-500 
          hover:text-blue-600 
          focus:bg-blue-50
          focus:text-blue-700
          disabled:text-white-200 
          disabled:hover:text-blue-300`;
      default:
        return `bg-blue-500 
          text-white-0 
          hover:bg-blue-600 
          focus:bg-blue-700 
          disabled:bg-white-200
          disabled:hover:bg-blue-300`;
    }
  };

  const sizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'h-10 w-10 text-[24px]';
      case 'md':
        return 'h-[52px] w-[52px] text-[32px]';
      default:
          return 'h-[52px] w-[52px] text-[32px]'
    }
  };

  const stateStyles = () => {
    if (disabled) {
      return 'opacity-50 cursor-not-allowed';
    }
    switch (state) {
      case 'pressed':
        return 'transform scale-95';
      case 'hover':
        return '';
      default:
        return '';
    }
  };

  const buttonClasses = [
    baseStyles,
    typeStyles(),
    sizeStyles(),
    stateStyles(),
    className,
  ].join(' ');


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
import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';


type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonState = 'enabled' | 'pressed' | 'hover' | 'disabled';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  state?: ButtonState;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'md',
  state = 'enabled',
  icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled,
  className = '',
  ...rest
}) => {

  const baseStyles = 'font-medium  ';

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
          border-1
          border-blue-500
          hover:bg-gray-200 
          focus:border-blue-700
          focus:text-blue-700
          disabled:border-white-200
          disabled:text-white-200 
          disabled:hover:bg-gray-100`;
        case 'tertiary':
          return `text-blue-500 
          hover:text-blue-600 
          focus:bg-blue-50
          focus:text-blue-700
          disabled:text-white-200 
          disabled:hover:text-blue-300`;
        default:
          return `bg-blue-500 
          text-white 
          hover:bg-blue-600 
          disabled:bg-blue-300 
          disabled:hover:bg-blue-300`;
      }
  };
  
  const sizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'font-medium text-body-s px-4 py-2 rounded-[32px]';
      case 'md':
        return 'font-medium text-body-m px-6 py-2 rounded-[32px]';
      default:
        return 'px-4 py-2 text-body-m rounded-[32px]';
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
      {children}
    </button>
  );
};

export default Button;

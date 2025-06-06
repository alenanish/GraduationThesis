"use client";
import React, {
  useState,
  useRef,
  FocusEventHandler,
  MouseEventHandler,
  ChangeEvent,
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  id: string;
  name?: string;
  state?: "enabled" | "disabled" | "error";
  size?: "s" | "m";
  isIconActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClickRightIcon?: MouseEventHandler<HTMLSpanElement>;
  label?: string;
  errorText?: string | null;
  helperText?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  state = "enabled",
  size = "m",
  isIconActive = false,
  rightIcon,
  leftIcon,
  placeholder,
  label,
  value,
  helperText,
  onChange,
  onFocus,
  onBlur,
  onClickRightIcon,
  errorText,
  className,
  required,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClickRightIcon: MouseEventHandler<HTMLSpanElement> = (e) => {
    if (isIconActive && onClickRightIcon) {
      onClickRightIcon(e);
    }
  };

  const getContainerStyles = () => {
    let baseStyles =
      className +
      "w-full  transform-all text-base-900 py-[6px] px-3 flex flex-row gap-2 items-center rounded-[32px] border-2 select-none";

    if (
      isHovered &&
      !isFocused &&
      !(state === "error") &&
      !(state === "disabled")
    ) {
      baseStyles += " hover:border-prime-200 hover:bg-prime-100 ";
    }

    switch (state) {
      case "disabled":
        baseStyles += " bg-base-50 border-base-100 cursor-not-allowed";
        break;
      case "enabled":
        baseStyles +=
          " bg-base-0 border-base-200 focus-within:border-prime-500 focus-within:bg-base-0";
        break;
      case "error":
        baseStyles +=
          " animate-shake bg-red-50 border-red-700 focus-within:border-red-500  focus-within:bg-base-0";
        break;
      default:
        baseStyles +=
          "b g-base-0 border-base-200 focus-within:border-prime-500 focus-within:bg-base-0";
        break;
    }

    if (size === "s") {
      baseStyles += " h-8";
    } else {
      baseStyles += " h-11";
    }

    return baseStyles;
  };

  const getInputStyles = () => {
    let baseStyles =
      " placeholder:text-base-400 placeholder:italic outline-hidden w-full bg-transparent placeholder:transition-colors focus-within:placeholder:text-transparent";

    if (size === "m") {
      baseStyles += " placeholder:text-body-s text-body-s";
    } else {
      baseStyles += " placeholder:text-body-m text-body-m";
    }

    if (state === "disabled") {
      baseStyles += " cursor-not-allowed";
    }

    return baseStyles;
  };

  const getIconStyles = () => {
    let baseStyles = "text-base-500";

    if (isIconActive) {
      baseStyles += " cursor-pointer";
    }

    return baseStyles;
  };

  const getLabelStyles = () => {
    let baseStyles = " absolute top-[-22] transition-all ease-in-out ";

    if (size === "s") {
      baseStyles += " text-caption";
    } else {
      baseStyles += " text-body-s";
    }

    if (isFocused) {
      baseStyles += " text-prime-500";
    } else {
      baseStyles += " text-base-400";
    }

    {
      /*if (!(isFocused || inputValue != "")) {
      baseStyles += " hidden";
      }
    */
    }

    return baseStyles;
  };

  return (
    <div
      className={`${
        label && (size === "m" ? "pb-4 pt-5" : size === "s" ? "pb-4 pt-4" : "")
      }  w-full  `}
    >
      <div className="w-full relative ">
        {label && (
          <label htmlFor={id} className={getLabelStyles()}>
            {label}
            {required && (
              <span
                className="text-red-600 ml-0.5"
                title="Обязательное поле"
                aria-label="Обязательное поле."
              >
                *
              </span>
            )}
          </label>
        )}
        <div
          className={getContainerStyles()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {leftIcon && (
            <span className={getIconStyles()} onClick={handleClickRightIcon}>
              {leftIcon}
            </span>
          )}
          <input
            ref={inputRef}
            id={id}
            name={name}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={state === "disabled"}
            className={getInputStyles()}
            {...rest}
          />
          {rightIcon && (
            <span className={getIconStyles()} onClick={handleClickRightIcon}>
              {rightIcon}
            </span>
          )}
        </div>
        {(errorText || state === "error") && (
          <p
            className={`${
              size === "m"
                ? "text-body-s bottom-[-20]"
                : "text-caption bottom-[-18]"
            }  absolute  text-red-500 mt-1`}
          >
            {errorText}
          </p>
        )}
        {helperText && !errorText && (
          <p className="text-base-500 text-body-s mt-1">{helperText}</p>
        )}
      </div>
    </div>
  );
};

export default Input;

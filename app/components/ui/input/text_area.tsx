"use client";
import React, {
  useState,
  useRef,
  FocusEventHandler,
  TextareaHTMLAttributes,
} from "react";

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  id: string;
  name: string;
  state?: "enabled" | "disabled" | "error";
  size?: "s" | "m";
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;

  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  label: string;
  errorText?: string | null;
  helperText?: string;
  rows?: number;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  state = "enabled",
  size = "m",
  placeholder,
  label,
  value,
  helperText,
  onChange,
  onFocus,
  onBlur,
  errorText,
  rows = 4,
  required,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getContainerStyles = () => {
    let baseStyles =
      "w-full h-fit transform-all text-base-900 py-[6px] px-3 flex items-start rounded-[16px] border-2 select-none";

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
          " bg-base-0 border-base-200 focus-within:border-prime-500 focus-within:bg-base-0";
        break;
    }

    if (size === "s") {
      baseStyles += " min-h-[32px]";
    } else {
      baseStyles += " min-h-[64px]";
    }

    return baseStyles;
  };

  const getTextareaStyles = () => {
    let baseStyles =
      " placeholder:text-base-400 placeholder:italic outline-none w-full bg-transparent placeholder:transition-colors focus-within:placeholder:text-transparent resize-none"; // Убираем outline и добавляем resize: none

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

  const getLabelStyles = () => {
    let baseStyles = " mb-1 transition-all ease-in-out block";

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
    }*/
    }
    return baseStyles;
  };

  return (
    <div className="w-full relative">
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
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={getTextareaStyles()}
          disabled={state === "disabled"}
          rows={rows}
          {...rest}
        />
      </div>
      {helperText && (
        <p className="mt-1 text-caption text-base-500">{helperText}</p>
      )}
      {errorText && (
        <p className="text-body-s bottom-[-18] absolute  text-red-500 ">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default TextArea;

import React from "react";

interface LabelProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  size?: "m" | "l";
}

const Label: React.FC<LabelProps> = ({
  label,
  children,
  className = "",
  size = "m",
}) => {
  const getLabelStyles = () => {
    let baseStyles = "text-base-900 ";

    if (size === "m") {
      baseStyles += " text-h5 font-medium";
    } else {
      baseStyles += " text-h4 font-medium";
    }

    return baseStyles;
  };

  const getContainerStyles = () => {
    let baseStyles = className + " bg-base-0 p-4  text-base-900  flex flex-col gap-y-2";

    if (size === "m") {
      baseStyles += " rounded-[8px]";
    } else {
      baseStyles += " rounded-[14px]";
    }

    return baseStyles;
  };

  return (
    <div
      className={getContainerStyles()}
    >
      {label && <h2 className={getLabelStyles()}>{label}</h2>}
      {children}
    </div>
  );
};

export default Label;

import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const ArrowUp: React.FC<IconProps> = ({
  color = "currentColor",
  size = "24",
}) => {
  const calculatedSize = size;
  const sizeString =
    typeof calculatedSize === "number" ? `${calculatedSize}px` : calculatedSize;
  const svgStyle = {
    width: sizeString,
    height: sizeString,
    color: color,
  };

  return (
    <div className="w-fit h-fit">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
      >
        <path
          d="M1.88751 16.1125L11.8875 6.11249L21.8875 16.1125L20.1125 17.8875L11.8875 9.66249L3.66251 17.8875L1.88751 16.1125Z"
          fill={"currentColor"}
        />
      </svg>
    </div>
  );
};

export default ArrowUp;

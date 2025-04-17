import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const ArrowDown: React.FC<IconProps> = ({
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
          d="M21.8875 7.88751L11.8875 17.8875L1.8875 7.88751L3.6625 6.11251L11.8875 14.3375L20.1125 6.11251L21.8875 7.88751Z"
          fill={"currentColor"}
        />
      </svg>
    </div>
  );
};

export default ArrowDown;

import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Add: React.FC<IconProps> = ({ color = "currentColor", size = "24" }) => {
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
        <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
      </svg>
    </div>
  );
};

export default Add;

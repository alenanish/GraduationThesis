import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const TrendingFlat: React.FC<IconProps> = ({
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
          d="M17.5 16.5L16.075 15.1L18.175 13H3V11H18.175L16.1 8.9L17.525 7.5L22 12L17.5 16.5Z"
          fill={"currentColor"}
        />
      </svg>
    </div>
  );
};

export default TrendingFlat;

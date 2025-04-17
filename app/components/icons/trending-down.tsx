import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const TrendingDown: React.FC<IconProps> = ({
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
          d="M16 18V16H18.6L13.4 10.85L9.4 14.85L2 7.4L3.4 6L9.4 12L13.4 8L20 14.6V12H22V18H16Z"
          fill={"currentColor"}
        />
      </svg>
    </div>
  );
};

export default TrendingDown;

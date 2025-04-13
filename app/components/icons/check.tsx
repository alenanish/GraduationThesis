import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Check: React.FC<IconProps> = ({
  color = "currentColor",
  size = "24",
}) => {
  const calculatedSize = size;
  const sizeString =
    typeof calculatedSize === "number" ? `${calculatedSize}px` : calculatedSize;
  const svgStyle = {
    width: sizeString,
    height: sizeString,
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
          d="M21 7.00003L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59003L21 7.00003Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Check;

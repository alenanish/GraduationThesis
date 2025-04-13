import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const ArrowBackward: React.FC<IconProps> = ({
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
          d="M16 22L6 12L16 2L17.775 3.775L9.55 12L17.775 20.225L16 22Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ArrowBackward;

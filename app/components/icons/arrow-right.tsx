import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const ArrowRight: React.FC<IconProps> = ({
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
          d="M4 11V13H16L10.5 18.5L11.92 19.92L19.84 12L11.92 4.08002L10.5 5.50002L16 11H4Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ArrowRight;

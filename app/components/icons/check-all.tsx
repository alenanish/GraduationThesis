import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const CheckAll: React.FC<IconProps> = ({
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
          d="M16.9961 6L6.52989 16.2586L2.41462 12.2191L1 13.5849L6.52989 19L18.4009 7.37556"
          fill={color}
        />
        <path
          d="M12 18L22.2929 8.1679"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
};

export default CheckAll;

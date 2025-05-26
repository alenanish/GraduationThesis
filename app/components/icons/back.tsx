import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Back: React.FC<IconProps> = ({ color = "currentColor", size = "24" }) => {
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
          d="M19.84 10.92V12.92H7.84L13.34 18.42L11.92 19.84L4 11.92L11.92 4L13.34 5.42L7.84 10.92H19.84Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Back;

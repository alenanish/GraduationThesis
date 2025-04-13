import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Send: React.FC<IconProps> = ({ color = "currentColor", size = "24" }) => {
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
        <mask
          id="mask0_424_1449"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect width="24" height="24" fill={"currentColor"} />
        </mask>
        <path d="M3 20V14L11 12L3 10V4L22 12L3 20Z" fill={color} />
      </svg>
    </div>
  );
};

export default Send;

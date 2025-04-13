import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Close: React.FC<IconProps> = ({
  color = "currentColor",
  size = "24",
}) => {
  return (
    <div className="w-fit h-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        stroke="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Close;

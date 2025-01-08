import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const CheckboxMarked: React.FC<IconProps> = ({
  color = "currentColor",
  size = "24",
}) => {
  return (
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
      <path d="M10 17L5 12L6.41 10.58L10 14.17L17.59 6.58L19 8M19 3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3Z" />
    </svg>
  );
};

export default CheckboxMarked;

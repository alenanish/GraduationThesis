import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Calendar: React.FC<IconProps> = ({
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
          d="M19 19V8H5V19H19ZM16 1H18V3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.89 3.89 3 5 3H6V1H8V3H16V1ZM7 10H9V12H7V10ZM15 10H17V12H15V10ZM11 14H13V16H11V14ZM15 14H17V16H15V14Z"
          fill={color}
        />
        <rect x="11" y="10" width="2" height="2" fill={color} />
      </svg>
    </div>
  );
};

export default Calendar;

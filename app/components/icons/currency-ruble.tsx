import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const CurrencyRuble: React.FC<IconProps> = ({
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
          d="M7 21V18H5V16H7V14H5V12H7V3H13.5C15.0333 3 16.3333 3.53333 17.4 4.6C18.4667 5.66667 19 6.96667 19 8.5C19 10.0333 18.4667 11.3333 17.4 12.4C16.3333 13.4667 15.0333 14 13.5 14H9V16H13V18H9V21H7ZM9 12H13.5C14.4667 12 15.2917 11.6583 15.975 10.975C16.6583 10.2917 17 9.46667 17 8.5C17 7.53333 16.6583 6.70833 15.975 6.025C15.2917 5.34167 14.4667 5 13.5 5H9V12Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CurrencyRuble;

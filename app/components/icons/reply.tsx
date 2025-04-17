import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Reply: React.FC<IconProps> = ({
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
          d="M19.3997 19.8882V15.8882C19.3997 15.0549 19.1081 14.3465 18.5247 13.7632C17.9414 13.1799 17.2331 12.8882 16.3997 12.8882H7.22475L10.8247 16.4882L9.39975 17.8882L3.39975 11.8882L9.39975 5.88818L10.8247 7.28818L7.22475 10.8882H16.3997C17.7831 10.8882 18.9622 11.3757 19.9373 12.3507C20.9123 13.3257 21.3997 14.5049 21.3997 15.8882V19.8882H19.3997Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Reply;

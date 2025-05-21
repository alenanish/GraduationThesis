import React from "react";

interface LoadingProps {
  size?: number;
  text?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 50,
  text = "",
  color = "var(--color-prime-300)",
}) => {
  const borderWidth = size / 10;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div
        className="animate-spin  rounded-full border-solid border-t-transparent"
        style={{
          width: size,
          height: size,
          borderWidth: borderWidth,
          borderColor: color,
          borderTopColor: "transparent",
           animation: `spin 1.5s linear infinite`
        }}
      ></div>
      {text && <div className="mb-2 text-center text-h5 italic text-base-600">{text}</div>}
    </div>
  );
};

export default Loading;


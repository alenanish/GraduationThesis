import React from "react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Vk: React.FC<IconProps> = ({ color = "currentColor", size = "24" }) => {
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
          d="M13.0647 18.9938C13.6229 18.9938 13.8511 18.5878 13.8447 18.0788C13.8163 16.1619 14.4992 15.1299 15.7321 16.4749C17.096 17.9628 17.3783 18.9938 19.0347 18.9938H21.9679C22.7085 18.9938 23 18.7338 23 18.3258C23 17.4628 21.6975 15.9399 20.5938 14.8219C19.0484 13.2569 18.976 13.2199 20.3069 11.3359C21.9578 8.99695 24.1174 5.99999 22.2071 5.99999H18.558C17.8504 5.99999 17.799 6.43498 17.547 7.08297C16.6349 9.42994 14.9016 12.4699 14.2434 12.0049C13.5551 11.5199 13.8704 9.59894 13.9226 6.74398C13.9364 5.98999 13.9327 5.47299 12.8768 5.205C12.3002 5.06 11.7392 5 11.2186 5C9.13508 5 7.6978 5.95299 8.51452 6.11899C9.95454 6.41198 9.81613 9.81094 9.48065 11.2789C8.89584 13.8349 6.69776 9.25494 5.78205 6.97397C5.56114 6.42598 5.49331 5.99999 4.70501 5.99999H1.72139C1.27041 5.99999 1 6.15998 1 6.51598C1 7.11797 3.71322 13.2359 6.30361 16.2859C8.82984 19.2608 11.3267 18.9938 13.0647 18.9938Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Vk;

import React from "react";
import {  TrendingUp, TrendingDown, TrendingFlat, Eye } from "../icons";


type ViewsTrend =
  | "up"
  | "down"
  | "flat";

interface ViewsTrendProps {
  state?: ViewsTrend;
  number?: number;
  className?: string;
}

const ViewsTrend: React.FC<ViewsTrendProps> = ({
  state = "flat",
  className = "",
  number = 0,
  ...rest
}) => {
  let icon;

  switch (state) {
    case "up":
      icon = <TrendingUp size={20} />;
      break;
    case "down":
        icon = <TrendingDown size={20} />;
      break;
    case "flat":
        icon = <TrendingFlat size={20} />;
      break;
    default:
        icon = <TrendingFlat size={20}/>;
      break;
  }


  return (
    <div {...rest} className='flex flex-row gap-1 text-base-700'>
      <Eye size={20} color="var(--color-prime-500)" />
      <span>{number}</span>
      {icon}
      
    </div>
  );
};

export default ViewsTrend;
import React from "react";
import {  Favourite, TrendingUp, TrendingDown, TrendingFlat } from "../icons";


type LikesTrend =
  | "up"
  | "down"
  | "flat";

interface LikesTrendProps {
  state?: LikesTrend;
  number?: number;
}

const LikesTrend: React.FC<LikesTrendProps> = ({
  state = "flat",
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
      <Favourite size={20} color="var(--color-prime-500)" />
      <span>{number}</span>
      {icon}
      
    </div>
  );
};

export default LikesTrend;
import React from "react";
import { CircleIcon } from "lucide-react";

interface IconProps {
  color?: string;
  size?: string | number;
}

const Logo: React.FC<IconProps> = ({
  color = "#0094C8",
  size = "24",
}) => {
  return (
    <div>
        <CircleIcon size={size} color={color} />
    </div>
    
  );
};

export default Logo;

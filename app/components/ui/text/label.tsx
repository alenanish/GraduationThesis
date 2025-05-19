import React from 'react';

interface LabelProps {
    label: string;
    children: React.ReactNode;
    className?: string;
}


const Label : React.FC<LabelProps> = ({ label, children, className='' }) => {
  return (
    <div className={`bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-2 ${className}`}>
      {label && <h2 className="text-body-h5 font-medium">{label}</h2>}
      {children}
    </div>
  );
};


export default Label;


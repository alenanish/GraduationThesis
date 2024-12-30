import React from 'react';

interface ReadOnlyFieldProps {
  label: string;
  text: string | number; 
  
}

const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({ label, text, }) => {
  return (
    <div className={`flex flex-col gap-1`}>
      <label className="text-body-s text-white-400">
        {label}
      </label>
      <div className="text-body-s text-white-900">
        {text}
      </div>
    </div>
  );
};

export default ReadOnlyField;


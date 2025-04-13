import React from "react";

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <div
      className={`flex border-2 bg-red-50 border-red-700 rounded-[32px] py-3 px-2 w-fit min-w-[260px] absolute`}
    >
      <label className="w-full text-body-s italic text-center text-base-700">
        {errorMessage}
      </label>
    </div>
  );
};

export default ErrorMessage;

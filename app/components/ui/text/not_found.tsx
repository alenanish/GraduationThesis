import Link from "next/link";
import React from "react";
import Button from "../button/button";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  message = "Страница не найдена",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-base-700 mb-8">{message}</p>
        <Link className="w-full" href="/" passHref>
          <Button className="w-full" size="l"> Вернуться на главную</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

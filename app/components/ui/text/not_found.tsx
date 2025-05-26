"use client";
import React from "react";
import Button from "../button/button";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({
  message = "Страница не найдена",
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl text-base-700 mb-8">{message}</p>
        <div className="w-full">
          <Button
            onClick={() => {
              router.push("/");
            }}
            className="w-full"
            size="l"
          >
            {" "}
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

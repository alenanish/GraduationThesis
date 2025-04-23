"use client";
import React, { useState } from "react";

import axios from "axios";
import Logo from "@/app/components/assets/images/logo";
import LoginForm from "@/app/components/forms/login-form";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: {
    email: string;
    password?: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/auth/token/login/", credentials);

      console.log("Успешный вход:", response.data);

      localStorage.setItem("authToken", response.data.token);

      // TODO: Перенаправьте пользователя на другую страницу (например, на главную)
    } catch (error: any) {
      console.error("Ошибка входа:", error);

      if (error.response) {
        // Сервер вернул код ошибки
        setError(error.response.data.detail || "Неверный логин или пароль"); // Извлеките сообщение об ошибке из ответа
      } else if (error.request) {
        // Сервер не ответил
        setError("Нет ответа от сервера.");
      } else {
        // Произошла ошибка при настройке запроса
        setError("Произошла ошибка при отправке запроса.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <Logo variant="form" size={160} />
      <h1 className=" text-h4  text-base-900 font-medium">Вход</h1>
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
    </div>
  );
};

export default LoginPage;

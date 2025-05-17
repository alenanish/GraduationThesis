"use client";

import LoginForm from "@/app/(auth)/forms/login-form";

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <h1 className=" text-h4  text-base-900 font-medium">Вход</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

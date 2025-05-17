"use client";
import React from "react";
import RegisterForm from "@/app/(auth)/forms/register-form";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <h1 className=" text-h4  text-base-900 font-medium">Регистрация</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;

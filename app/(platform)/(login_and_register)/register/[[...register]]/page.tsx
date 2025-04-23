"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/components/forms/register-form";
import Logo from "@/app/components/assets/images/logo";

const RegisterPage = () => {
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterSubmit = async (credentials: {
    email: string;
    password?: string;
    re_password?: string;
    role: "startup" | "investor" | "specialist";
  }) => {
    setIsLoading(true);
    setRegistrationError(null);
    router.push("/profile/edit/");

    try {
      const response = await fetch("/auth/token/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        console.log("Registration successful!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);

        if (errorData && errorData.message) {
          setRegistrationError(errorData.message);
        } else {
          setRegistrationError("Произошла ошибка при регистрации.");
        }
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      setRegistrationError("Произошла ошибка при регистрации.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 items-center w-full">
      <Logo variant="form" size={160} />
      <h1 className=" text-h4  text-base-900 font-medium">Регистрация</h1>
      <RegisterForm
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
        error={registrationError}
      />
    </div>
  );
};

export default RegisterPage;

"use client";
import React, { useState } from "react";
import { Input, Button } from "../ui";

import { PasswordNoSee, PasswordSee } from "../icons";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password?: string }) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    onSubmit({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 max-w-xl min-w-sm px-4 py-5 bg-base-0 rounded-[32px]"
    >
      <div className="flex flex-col gap-y-2">
        <Input
          id="email"
          state={error ? "error" : "enabled"}
          label="Почта"
          placeholder="Почта"
          value={email}
          size="M"
          errorText={error}
          onChange={setEmail}
        />
        <Input
          id="password"
          name="password"
          label="Пароль"
          placeholder="Пароль"
          state={error ? "error" : "enabled"}
          size="M"
          errorText={error}
          type={isPasswordVisible ? "text" : "password"}
          rightIcon={
            isPasswordVisible ? (
              <PasswordSee size={24} />
            ) : (
              <PasswordNoSee size={24} />
            )
          }
          isIconActive={true}
          onClickRightIcon={handleTogglePasswordVisibility}
          value={password}
          onChange={setPassword}
        />
        <div className="flex flex-col gap-y-2 ">
          <div className="place-items-end">
            <Button className="w-fit" size="s" type="button" variant="tertiary">
              Забыли пароль?
            </Button>
          </div>

          <Button type="submit" disabled={isLoading}>
            Войти
          </Button>
          <Link href="/register">
            <Button
              className="w-full"
              variant="secondary"
              type="button"
              color="base"
            >
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

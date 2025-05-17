"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Input, Button, ErrorMessage } from "../../components/ui";
import { PasswordSee, PasswordNoSee } from "../../components/icons";
import { useAuth } from "@/app/context/auth_context";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { login } = useAuth();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const handleCloseError = () => {
    setShowError(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const isEmptyFields = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Заполните это поле.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Заполните это поле.");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (!isEmptyFields) {
      return;
    }

    try {
      console.log({ email, password });
      login(email, password);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setPasswordError(error.response.data.non_field_errors[0]);
        setEmailError(error.response.data.non_field_errors[0]);
      } else {
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showError && (
        <ErrorMessage onClose={handleCloseError}>
          <p>Произошла ошибка при регистрации.</p>
          <p>Попробуйте позже.</p>
        </ErrorMessage>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-1/3 max-w-xl min-w-sm px-4 py-5 bg-base-0 rounded-[32px]"
      >
        <div className="flex flex-col gap-y-2">
          <Input
            required
            id="email"
            name="email"
            label="Почта"
            placeholder="Почта"
            value={email}
            state={emailError ? "error" : "enabled"}
            size="m"
            onChange={setEmail}
            errorText={emailError ? emailError : null}
            onBlur={() => {
              if (!email) {
                setEmailError("Заполните это поле.");
              } else {
                setEmailError(null);
              }
            }}
          />
          <Input
            required
            id="password"
            name="password"
            label="Пароль"
            placeholder="Пароль"
            value={password}
            state={passwordError ? "error" : "enabled"}
            size="m"
            type={isPasswordVisible ? "text" : "password"}
            errorText={passwordError ? passwordError : null}
            rightIcon={
              isPasswordVisible ? (
                <PasswordSee size={24} />
              ) : (
                <PasswordNoSee size={24} />
              )
            }
            isIconActive={true}
            onClickRightIcon={handleTogglePasswordVisibility}
            onChange={setPassword}
            onBlur={() => {
              if (!password) {
                setPasswordError("Заполните это поле.");
              } else {
                setPasswordError(null);
              }
            }}
          />
          <div className="flex flex-col gap-y-2 ">
            <div className="place-items-end">
              <Button
                className="w-fit"
                size="s"
                type="button"
                variant="tertiary"
              >
                Забыли пароль?
              </Button>
            </div>

            <Button type="submit" disabled={isLoading}>
              Войти
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              type="button"
              color="base"
              onClick={() => router.push("/register")}
            >
              Зарегистрироваться
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;

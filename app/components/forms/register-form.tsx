"use client";
import React, { useState } from "react";
import { Input, Button, RadioGroup } from "../ui";
import { PasswordNoSee, PasswordSee } from "../icons";
import Link from "next/link"; 

interface RegisterFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
    re_password: string;
    role: "startup" | "investor" | "specialist";
  }) => void;
  isLoading?: boolean;
  error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"startup" | "investor" | "specialist">(
    "startup"
  );
  const [passwordMismatchError, setPasswordMismatchError] = useState<
    string | null
  >(null);
  const [emailFormatError, setEmailFormatError] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (!email) {
      setEmailFormatError("Это поле необходимо заполнить");
    }
    if (!password) {
      setEmailFormatError("Это поле необходимо заполнить");
    }
    if (password !== rePassword) {
      setPasswordMismatchError("Пароли не совпадают!");
      return;
    }
    setPasswordMismatchError(null);

    if (!validateEmailFormat(email)) {
      setEmailFormatError("Неверный формат почты");
      return;
    }
    setEmailFormatError(null);

    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password, re_password: rePassword, role });
    console.log({ email, password, re_password: rePassword, role });
    
  };

  const handleRoleChange = (value: string) => {
    setRole(value as "startup" | "investor" | "specialist");
  };

  const roleOptions = [
    { label: "Startup", value: "startup" },
    { label: "Investor", value: "investor" },
    { label: "Specialist", value: "specialist" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/3 max-w-xl min-w-sm mx-auto px-4 py-5 bg-base-0 rounded-[32px]"
    >
      {step === 1 && (
        <div className="flex flex-col gap-y-2">
          <Input
            required
            id="email"
            label="Почта"
            placeholder="Почта"
            value={email}
            state={error || emailFormatError ? "error" : "enabled"}
            size="M"
            onChange={setEmail}
            errorText={error || emailFormatError ? emailFormatError : null}
            onBlur={() => {
              if (email && !validateEmailFormat(email)) {
                setEmailFormatError("Неверный формат почты");
              } else {
                setEmailFormatError(null);
              }
            }}
          />

          <Input
            required
            id="password"
            name="password"
            label="Пароль"
            placeholder="Пароль"
            state={error ? "error" : "enabled"}
            size="M"
            type={isPasswordVisible ? "text" : "password"}
            errorText={error ? emailFormatError : null}
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

          <Input
            required
            id="re_password"
            name="re_password"
            label="Повторите пароль"
            placeholder="Повторите пароль"
            state={passwordMismatchError ? "error" : "enabled"}
            size="M"
            type={isPasswordVisible ? "text" : "password"}
            errorText={passwordMismatchError}
            rightIcon={
              isPasswordVisible ? (
                <PasswordSee size={24} />
              ) : (
                <PasswordNoSee size={24} />
              )
            }
            isIconActive={true}
            onClickRightIcon={handleTogglePasswordVisibility}
            value={rePassword}
            onChange={setRePassword}
          />
          <div className="flex flex-col gap-y-2 ">
            <Button type="button" onClick={handleNextStep} disabled={isLoading}>
              Далее
            </Button>
            <Link href="/login">
              <Button
                className="w-full"
                variant="secondary"
                type="button"
                color="base"
              >
                Войти
              </Button>
            </Link>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-y-4">
          <RadioGroup
            options={roleOptions}
            onChange={handleRoleChange}
            value={role}
            name="Выберите роль"
          />
          <div className="flex flex-col gap-y-2">
            <Button
              type="button"
              color="base"
              variant="tertiary"
              onClick={handlePrevStep}
            >
              Назад
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;

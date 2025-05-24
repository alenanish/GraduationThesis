"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, RadioGroup, ErrorMessage } from "../../components/ui";
import { PasswordSee, PasswordNoSee } from "../../components/icons";
import { api } from "@/app/utils/api";
import { useAuth } from "@/app/context/auth_context";
import Link from "next/link";

const RegisterForm = () => {
  const { register } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [re_password, setRePassword] = useState<string>("");
  const [role, setRole] = useState<string>("startup");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isRePasswordVisible, setIsRePasswordVisible] =
    useState<boolean>(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [re_passwordError, setRePasswordError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleCloseError = () => {
    setShowError(false);
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidRepassword = (re_password: string) => {
    if (password !== re_password) {
      setRePasswordError("Пароли не совпадают.");
      return false;
    } else {
      setRePasswordError(null);
      return true;
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleToggleRePasswordVisibility = () => {
    setIsRePasswordVisible(!isRePasswordVisible);
  };

  const handleNextStep = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Заполните это поле.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Неверный формат почты.");
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

    if (!re_password) {
      setRePasswordError("Заполните это поле.");
      isValid = false;
    } else if (!isValidRepassword(re_password)) {
      setRePasswordError("Пароли не совпадают.");
      isValid = false;
    } else {
      setRePasswordError(null);
    }

    if (isValid) {
      setStep(2);
    }
    setIsLoading(false);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleRoleChange = (value: string) => {
    setRole(value as "startup" | "investor" | "specialist");
  };

  const roleOptions = [
    { label: "Основатель стартапа", value: "startup" },
    { label: "Инвестор", value: "investor" },
    { label: "Специалист", value: "specialist" },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await api.post(`/auth/users/`, {
        email: email,
        password: password,
        re_password: re_password,
        role: role,
      });

      console.log("Registration successful:", response.data);
      register(email, password);
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.password
      ) {
        setPasswordError(error.response.data.password[0]);
        handlePrevStep();
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.email
      ) {
        setEmailError(error.response.data.email[0]);
        handlePrevStep();
      } else {
        setShowError(true);
        setIsLoading(false);
      }
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
        className="select-none w-1/3 max-w-xl min-w-sm mx-auto px-4 py-5 bg-base-0 rounded-[32px]"
      >
        {step === 1 && (
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
                  setEmailError("Заполните это поле");
                } else if (email && !isValidEmail(email)) {
                  setEmailError("Неверный формат почты.");
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
              state={passwordError ? "error" : "enabled"}
              size="m"
              type={isPasswordVisible ? "text" : "password"}
              errorText={passwordError ? passwordError : null}
              onBlur={() => {
                if (!password) {
                  setPasswordError("Заполните это поле");
                } else {
                  setPasswordError(null);
                }
              }}
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
              state={re_passwordError ? "error" : "enabled"}
              size="m"
              type={isRePasswordVisible ? "text" : "password"}
              errorText={re_passwordError ? re_passwordError : null}
              rightIcon={
                isRePasswordVisible ? (
                  <PasswordSee size={24} />
                ) : (
                  <PasswordNoSee size={24} />
                )
              }
              onBlur={() => {
                if (!re_password) {
                  setRePasswordError("Заполните это поле");
                } else if (re_password && !isValidRepassword) {
                  setRePasswordError(
                    "Пароль должен быть не менее 8 символов и содержать строчные, заглавные буквы и цифры."
                  );
                } else {
                  setRePasswordError(null);
                }
              }}
              isIconActive={true}
              onClickRightIcon={handleToggleRePasswordVisibility}
              value={re_password}
              onChange={setRePassword}
            />
            <div className="flex flex-col gap-y-2 ">
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={isLoading}
              >
                Далее
              </Button>
              <Link href="/login" passHref>
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
    </>
  );
};
export default RegisterForm;

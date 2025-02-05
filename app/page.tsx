"use client";

import React, { useState } from "react";
import Button from "./components/ui/button";
import IconButton from "./components/ui/icon_button";
import Input from "./components/ui/input";
import { Circle, EyeIcon, EyeOff, CircleXIcon } from "lucide-react";
import ReadOnlyField from "./components/ui/read-only";
import RadioGroup from "./components/ui/radio-group";
import CheckboxGroup from "./components/ui/checkbox-group";
import Switch from "./components/ui/switch";
import SignInForm from "./components/forms/SignInForm";
import TopBarButton from "./components/ui/top_bar_button";
import TopBar from "./components/ui/top_bar";
import ErrorMessage from "./components/ui/error_message";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (value: string) => {
    setInputValue(value);
  };

  const [selectedOption, setSelectedOption] = useState("option1");

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
  };

  const radioOptions = [
    {
      label: "Первый вариант",
      value: "option1",
    },
    {
      label: "Второй вариант",
      value: "option2",
    },
    {
      label: "Третий вариант",
      value: "option3",
      disabled: true,
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    { label: "Первый вариант", value: "option1" },
    { label: "Второй вариант", value: "option2" },
    { label: "Третий вариант", value: "option3", disabled: true },
  ];

  const handleCheckboxGroupChange = (selectedValues: string[]) => {
    setSelectedOptions(selectedValues);
    console.log("selected values in app", selectedValues);
  };

  const [isChecked, setIsChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  const handleSignIn = async (credentials: {
    email: string;
    password?: string;
  }) => {
    setIsLoading(true);
    setAuthError(undefined);
  };

  return (
    <div className="p-4 space-y-4">
      <TopBar />

      <h2 className="text-h4 font-bold text-base-900">Buttons</h2>
      {/* Secondary Buttons */}
      <div className="flex space-x-4">
        <Button variant="primary" size="l">
          Button
        </Button>
        <Button variant="secondary" size="l">
          Button
        </Button>
        <Button variant="tertiary" size="l">
          Button
        </Button>
        <Button variant="primary" size="l" disabled>
          Button
        </Button>
      </div>
      <div className="flex space-x-4">
        {/* Primary Buttons */}
        <Button variant="primary">
          <Circle size={16} />
          Button
        </Button>
        <Button variant="secondary">Button</Button>
        <Button variant="tertiary">Button</Button>
        <Button variant="secondary" disabled>
          Button
        </Button>
      </div>
      <div className="flex space-x-4">
        {/* Secondary Buttons */}

        <Button variant="primary" size="s">
          <Circle size={12} />
          Button
          <Circle size={12} />
        </Button>
        <Button variant="secondary" size="s">
          Button
        </Button>
        <Button variant="tertiary" size="s">
          Button
        </Button>
        <Button variant="primary" size="s" disabled>
          Button
        </Button>
      </div>
      <h2 className="text-h4 font-bold text-base-900">Top Bar Buttons</h2>
      <div className="flex space-x-4">
        <TopBarButton color="prime" size="s">
          Button
        </TopBarButton>
        <TopBarButton color="base" size="s">
          Button
        </TopBarButton>
        <TopBarButton color="prime" size="m">
          Button
        </TopBarButton>
        <TopBarButton color="base" size="m">
          Button
        </TopBarButton>
        <TopBarButton color="base" size="m" disabled>
          Button
        </TopBarButton>
      </div>
      <div className="flex space-x-4">
        <TopBarButton variant="top-bar-menu" color="prime" size="s">
          Button
        </TopBarButton>
        <TopBarButton variant="top-bar-menu" color="base" size="s">
          Button
        </TopBarButton>
        <TopBarButton variant="top-bar-menu" color="prime" size="m">
          Button
        </TopBarButton>
        <TopBarButton variant="top-bar-menu" color="base" size="m">
          Button
        </TopBarButton>
        <TopBarButton variant="top-bar-menu" color="base" size="m" disabled>
          Button
        </TopBarButton>
      </div>

      <h2 className="text-h4 font-bold text-base-900  ">Icon Buttons</h2>
      <div className="flex flex-row gap-3">
        {/* Icon Buttons */}
        <IconButton size="m">
          <Circle size={32} />
        </IconButton>
        <IconButton variant="secondary" size="m">
          <EyeIcon size={32} />
        </IconButton>
        <IconButton variant="tertiary" size="m">
          <Circle size={32} />
        </IconButton>
        <IconButton size="m" disabled>
          <Circle size={32} />
        </IconButton>
        <IconButton size="s">
          <Circle size={24} />
        </IconButton>
        <IconButton variant="secondary" size="s">
          <Circle size={24} />
        </IconButton>
        <IconButton variant="tertiary" size="s">
          <Circle size={24} />
        </IconButton>
        <IconButton variant="tertiary" size="l" color="base">
          <Circle size={88} />
        </IconButton>
      </div>
      <h2 className="text-h4 font-bold text-base-900">Input</h2>
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col space-y-6 w-1/3">
          <Input size="S" placeholder="Enter your name" value={inputValue} />
          <Input
            state="enabled"
            size="S"
            placeholder="Name"
            label="Name"
            rightIcon={<Circle size={16} />}
            value={inputValue}
            onChange={handleChange}
          />
          <Input
            state="error"
            size="S"
            placeholder="Error input"
            rightIcon={<Circle size={16} />}
            value={inputValue}
            errorText="This field is required"
            onChange={handleChange}
          />
          <Input
            state="disabled"
            size="S"
            placeholder="Disabled input"
            leftIcon={<Circle size={16} />}
            value={inputValue}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2 w-1/3">
          <Input
            state="enabled"
            size="M"
            id="name"
            label="Name"
            placeholder="Enter your name"
            value={inputValue}
            onChange={handleChange}
          />
          <Input
            name="password"
            id="password"
            label="Password"
            state="enabled"
            size="M"
            placeholder="Password"
            rightIcon={
              isPasswordVisible ? <EyeOff size={24} /> : <EyeIcon size={24} />
            }
            isIconActive={true}
            onClickRightIcon={handleTogglePasswordVisibility}
            value={isPasswordVisible ? "********" : inputValue}
            helperText="The password should be 8 letters long and must contain numbers and uppercase letter."
            onChange={handleChange}
          />
          <Input
            state="error"
            size="M"
            placeholder="Error input"
            rightIcon={<CircleXIcon size={24} />}
            value={inputValue}
            errorText="This field is required"
            onChange={handleChange}
          />
          <Input
            state="disabled"
            size="M"
            placeholder="Disabled input"
            leftIcon={<Circle size={24} />}
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>

      <ReadOnlyField label={"Lable"} text="Read-only text field" />

      <div>
        <h2 className="text-h4 font-bold text-base-900">Radio Group</h2>
        <RadioGroup
          options={radioOptions}
          name="myRadioGroup"
          onChange={handleRadioChange}
          value={selectedOption}
        />
        <p>Выбранное значение: {selectedOption}</p>
      </div>
      <div>
        <h2 className="text-h4 font-bold text-base-900">Checkbox Group</h2>
        <CheckboxGroup
          options={options}
          selectedValues={selectedOptions}
          onChange={handleCheckboxGroupChange}
        />
        <div className="mt-4">
          <p>Selected Options: {selectedOptions.join(", ")}</p>
        </div>
      </div>
      <h2 className="text-h4 font-bold text-base-900">Switch</h2>

      <div className="flex flex-col space-y-6">
        <Switch
          label="Option"
          disabled={true}
          checked={!isChecked}
          onChange={setIsChecked}
        />
        <Switch
          label="Option"
          disabled={true}
          checked={isChecked}
          onChange={setIsChecked}
        />
        <Switch label="Option" checked={isChecked} onChange={setIsChecked} />
      </div>
      <SignInForm
        onSubmit={handleSignIn}
        isLoading={isLoading}
        error={authError}
      />
      <ErrorMessage errorMessage="KFSKFAK" />
    </div>
  );
}

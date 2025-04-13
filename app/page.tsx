"use client";

import React, { useState } from "react";

import {
  Account,
  Add,
  ArrowBackward,
  ArrowDown,
  ArrowForward, 
  ArrowRight,
  ArrowUp,
  Back,
  Bell,
  BidLandscape,
  Cached,
  Calendar,
  Cancel,
  Check,
  CheckAll,
  CheckboxBlank,
  CheckboxMarked,
  CheckCircle,
  CheckCircleFilled,
  Close,
  CurrencyRuble,
  Delete,
  Edit,
  Favourite,
  Gmail,
  Hourglass,
  Menu,
  More,
  NotFavourite,
  PasswordNoSee,
  PasswordSee,
  Phone,
  Plus,
  RadioboxBlank,
  RadioboxMarked,
  Reply,
  RocketLaunch,
  Search,
  Send,
  Template,
  Tg,
  TrendingDown,
  TrendingFlat,
  TrendingUp,
  Vk,
} from "./components/icons";
import SignInForm from "./components/forms/sign-in-form";

import {
  Button,
  IconButton,
  Switch,
  Input,
  CheckboxGroup,
  RadioGroup,
  ReadOnlyField,
  ErrorMessage,
  ProjectState,
} from "./components/ui";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
      <h2 className="text-h4 font-bold text-base-900">Icons</h2>
      <div className="flex space-x-4">
        <Cached color={"var(--color-base-700)"} />
        <BidLandscape color={"var(--color-base-700)"} />
        <RocketLaunch color={"var(--color-base-700)"} />
        <CheckCircleFilled color={"var(--color-base-700)"} />
        <CheckboxBlank color={"var(--color-base-700)"} />
        <CheckboxMarked color={"var(--color-base-700)"} />
        <Hourglass color={"var(--color-base-700)"} />
        <RadioboxBlank color={"var(--color-base-700)"} />
        <RadioboxMarked color={"var(--color-base-700)"} />
        <Template color={"var(--color-base-700)"} />
        <Close color={"var(--color-base-700)"} />
        <ArrowRight color={"var(--color-base-700)"} />
        <Back color={"var(--color-base-700)"} />
        <PasswordSee color={"var(--color-base-700)"} />
        <PasswordNoSee color={"var(--color-base-700)"} />
      </div>
      <div className="flex space-x-4 w-">
        <Bell color={"var(--color-base-700)"} />
        <Check color={"var(--color-base-700)"} />
        <Delete color={"var(--color-base-700)"} />
        <CheckCircle color={"var(--color-base-700)"} />
        <Cancel color={"var(--color-base-700)"} />
        <Menu color={"var(--color-base-700)"} />
        <Gmail color={"var(--color-base-700)"} />
        <Tg color={"var(--color-base-700)"} />
        <Search color={"var(--color-base-700)"} />
        <Vk color={"var(--color-base-700)"} />
        <More color={"var(--color-base-700)"} />
        <ArrowForward color={"var(--color-base-700)"} />
        <ArrowBackward color={"var(--color-base-700)"} />
        <Plus color={"var(--color-base-700)"} />
        <Edit color={"var(--color-base-700)"} />
        <CurrencyRuble color={"var(--color-base-700)"} />
      </div>
      <div className="flex space-x-4 w-">
      <NotFavourite color={"var(--color-base-700)"} />
      <Favourite color={"var(--color-base-700)"} />
      <TrendingUp color={"var(--color-base-700)"} />
      <TrendingDown color={"var(--color-base-700)"} />
      <TrendingFlat color={"var(--color-base-700)"} />
      <ArrowUp color={"var(--color-base-700)"} />
      <ArrowDown color={"var(--color-base-700)"} />
      <CheckAll color={"var(--color-base-700)"} />
      <Send color={"var(--color-base-700)"} />
      <Reply color={"var(--color-base-700)"} />
      <Account color={"var(--color-base-700)"} />
      <Phone color={"var(--color-base-700)"} />
      <Add color={"var(--color-base-700)"} />
      <Calendar color={"var(--color-base-700)"} />


      </div>

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
          <RadioboxBlank size={16} />
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
          <RadioboxBlank size={12} />
          Button
          <RadioboxBlank size={12} />
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
      <h2 className="text-h4 font-bold text-base-900  ">Icon Buttons</h2>
      <div className="flex flex-row gap-3">
        {/* Icon Buttons */}
        <IconButton size="m">
          <ArrowRight size={32} />
        </IconButton>
        <IconButton variant="secondary" size="m">
          <ArrowRight size={32} />
        </IconButton>
        <IconButton variant="tertiary" size="m">
          <Template size={32} />
        </IconButton>
        <IconButton size="m" disabled>
          <Template size={32} />
        </IconButton>
        <IconButton size="s">
          <Template size={24} />
        </IconButton>
        <IconButton variant="secondary" size="s">
          <Template size={24} />
        </IconButton>
        <IconButton variant="tertiary" size="s">
          <Template size={24} />
        </IconButton>
        <IconButton variant="tertiary" size="l" color="base">
          <Template size={88} />
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
            rightIcon={<RadioboxBlank size={16} />}
            value={inputValue}
            onChange={handleChange}
          />
          <Input
            state="error"
            size="S"
            placeholder="Error input"
            rightIcon={<RadioboxBlank size={16} />}
            value={inputValue}
            errorText="This field is required"
            onChange={handleChange}
          />
          <Input
            state="disabled"
            size="S"
            placeholder="Disabled input"
            rightIcon={<RadioboxBlank size={16} />}
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
            helperText="The password should be 8 letters long and must contain numbers and uppercase letter."
            onChange={handleChange}
          />
          <Input
            state="error"
            size="M"
            placeholder="Error input"
            rightIcon={<RadioboxBlank size={24} />}
            value={inputValue}
            errorText="This field is required"
            onChange={handleChange}
          />
          <Input
            state="disabled"
            size="M"
            placeholder="Disabled input"
            rightIcon={<RadioboxBlank size={24} />}
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

      {/*   <div className="absolute top-10 w-full flex justify-center">
        <ErrorMessage errorMessage="KFSKFAK" />{" "}
      </div>
      */}
      <ProjectState state="expectation" />
      <ProjectState state="in-process" />
      <ProjectState state="launch" />
      <ProjectState state="results-analysis" />
      <ProjectState state="completed" />
    </div>
  );
}

import { DropdownList, Input, TextArea } from "@/app/components/ui";
import { Profession } from "@/app/types/profession";

interface DropdownOption {
  id: number | string;
  name: string;
}

interface GeneralInfoProps {
  fullName: string | null;
  setFullName: (name: string | null) => void;
  option?: DropdownOption | null;
  profession?: Profession | null;
  label: string;
  setOption: (option: DropdownOption | null) => void;
  bio: string | null;
  setBio: (bio: string | null) => void;
  company?: string | null;
  setCompany?: (company: string | null) => void;
  position?: string | null;
  setPosition?: (position: string | null) => void;
  options: DropdownOption[];
  fullNameError: string | null;
  setFullNameError: (error: string | null) => void;
}

const EditGeneralInfo: React.FC<GeneralInfoProps> = ({
  fullName,
  setFullName,
  option,
  label,
  setOption,
  bio,
  setBio,
  options,
  fullNameError,
  setFullNameError,
  company,
  setCompany,
  position,
  setPosition,
}) => {
  const handleDropdownChange = (option: DropdownOption) => {
    setOption(option);
  };

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-row">
        <div className="flex flex-row h-20 gap-x-4 w-3/5 items-center ">
          <Input
            required
            size="m"
            id="full_name"
            name="full_name"
            label="Имя"
            placeholder="Имя"
            value={fullName ? fullName : ""}
            onChange={setFullName}
            state={fullNameError ? "error" : "enabled"}
            errorText={fullNameError ? fullNameError : ""}
            onBlur={() => {
              if (!fullName) {
                setFullNameError("Заполните это поле");
              } else {
                setFullNameError(null);
              }
            }}
          />
          <div className="mb-5 w-2/5">
            <DropdownList
              required
              id={label}
              label={label}
              placeholder={label}
              options={options}
              value={option?.id}
              onChange={handleDropdownChange}
            />
          </div>
        </div>
      </div>
      {setCompany && setPosition && (
        <div className="flex flex-row h-20 gap-x-4 w-1/2 items-center ">
          <Input
            size="m"
            id="position"
            name="position"
            label="Должность"
            placeholder="Должность"
            value={position ? position : ""}
            onChange={setPosition}
          />
          <Input
            size="m"
            id="company"
            name="company"
            label="Компания"
            placeholder="Компания"
            value={company ? company : ""}
            onChange={setCompany}
          />
        </div>
      )}

      <div className="flex h-31 items-end ">
        <TextArea
          id="bio"
          name="bio"
          label="Описание"
          placeholder="Описание"
          value={bio ? bio : ""}
          onChange={setBio}
        />
      </div>
    </div>
  );
};

export default EditGeneralInfo;

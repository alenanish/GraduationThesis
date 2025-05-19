import { DropdownList, Input, TextArea } from "@/app/components/ui";
import { Industry } from "@/app/types/industry";
import { Profession } from "@/app/types/profession";

interface DropdownOption {
  id: number;
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
  options: DropdownOption[];
  fullNameError: string | null;
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
}) => {
  const handleDropdownChange = (option: Industry) => {
    setOption(option);
  };

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex flex-row">
        <div className="flex flex-row h-20 gap-x-4 w-2/3 items-center ">
          <Input
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
                // @ts-ignore
                setFullNameError("Заполните это поле");
              } else {
                // @ts-ignore
                setFullNameError(null);
              }
            }}
          />
          <div className="mb-4 w-2/5">
            <DropdownList
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

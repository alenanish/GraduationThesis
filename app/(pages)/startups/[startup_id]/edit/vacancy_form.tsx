"ese client";
import NewSkillsList from "@/app/(pages)/profile/edit/_components/new_skill";
import { Button } from "@/app/components/ui";
import Loading from "@/app/components/ui/custom/loading";
import Modal from "@/app/components/ui/custom/modal";
import Dropdown from "@/app/components/ui/drop-down/dropdown-list";
import { Skill } from "@/app/types/skill";
import { useState } from "react";

interface VacancyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  professions: DropdownOption[];
  specialists?: DropdownOption[];
  skills: Skill[];
  className?: string;
}
interface DropdownOption {
  id: string | number;
  name: string;
}

const VacancyFormModal: React.FC<VacancyFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  professions,
  skills,
  className,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profession, setProfession] = useState<DropdownOption | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Skill[] | []>([]);

  const handleProfessionChange = (option: DropdownOption) => {
    setProfession(option);
  };

  const handleSkillsChange = (skills: Skill[]) => {
    setSelectedSkills(skills);
  };

  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    onSubmit({
      profession: profession,
      skills: selectedSkills,
    });

    onClose();
    handleClear();
  };

  const handleClear = () => {
    setProfession(null);
    setProfession(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создать вакансию"
      className={className}
    >
      <Dropdown
        id="profession"
        label="Профессия"
        options={professions}
        onChange={handleProfessionChange}
        value={profession?.name}
        placeholder="Выберите профессию"
      />

      <NewSkillsList
        initialSkills={selectedSkills}
        allSkills={skills}
        onSkillsChange={handleSkillsChange}
      />

      <div className="flex w-full flex-row gap-x-2 justify-end mt-2">
        <Button
          size="s"
          variant="tertiary"
          color="base"
          onClick={onClose}
          type="button"
          className="w-full"
        >
          Отменить
        </Button>
        <Button
          size="s"
          variant="primary"
          color="prime"
          disabled={profession === null || selectedSkills.length === 0}
          type="submit"
          className="w-full"
          onClick={handleSubmit}
        >
          Добавить
        </Button>
      </div>
    </Modal>
  );
};

export default VacancyFormModal;

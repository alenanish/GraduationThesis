"use client";
import { useEffect, useState } from "react";
import ErrorMessage from "../text/error-message";
import Modal from "./modal";
import { authenticatedRequest } from "@/app/utils/api";
import Loading from "./loading";
import { Button, DropdownList } from "..";
import { MyStartupType, RequiredSpecialist } from "@/app/types/startup";

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (startupId: number, vacancyId: number) => void;
}

interface DropdownOption {
  id: string | number;
  name: string;
}

interface MyStartupDetailsType extends MyStartupType {
  required_specialists: RequiredSpecialist[];
}

const InviteModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [startups, setStartups] = useState<MyStartupType[]>([]);
  const [startupOptions, setStartupOptions] = useState<DropdownOption[]>([]);
  const [selectedStartupId, setSelectedStartupId] = useState<number | null>(
    null
  );
  const [selectedStartupDetails, setSelectedStartupDetails] =
    useState<MyStartupDetailsType | null>(null);
  const [vacancyOptions, setVacancyOptions] = useState<DropdownOption[]>([]);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const convertStartupsToOptions = (data: MyStartupType[]): DropdownOption[] =>
    data.map(({ id, title }) => ({
      id,
      name: title,
    }));

  const convertVacanciesToOptions = (
    data: RequiredSpecialist[]
  ): DropdownOption[] =>
    data.map(({ id, profession, profession_id }) => ({
      id: id ?? profession_id ?? profession.id,
      name: profession.name,
    }));

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      authenticatedRequest<MyStartupType[]>("/startups/my-startups/", "get")
        .then((response) => {
          setStartups(response.data);
          setStartupOptions(convertStartupsToOptions(response.data));
          setSelectedStartupId(null);
          setSelectedStartupDetails(null);
          setVacancyOptions([]);
          setSelectedVacancyId(null);
          setError(null);
        })
        .catch(() => setError("Ошибка при загрузке стартапов"))
        .finally(() => setLoading(false));
    } else {
      setStartups([]);
      setStartupOptions([]);
      setSelectedStartupId(null);
      setSelectedStartupDetails(null);
      setVacancyOptions([]);
      setSelectedVacancyId(null);
      setError(null);
      setLoading(false);
      setLoadingDetails(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedStartupId !== null) {
      setLoadingDetails(true);
      authenticatedRequest<MyStartupDetailsType>(
        `/startups/${selectedStartupId}/`,
        "get"
      )
        .then((response) => {
          setSelectedStartupDetails(response.data);
          const vacancies = convertVacanciesToOptions(
            response.data.required_specialists
          );
          setVacancyOptions(vacancies);
          setSelectedVacancyId(null);
          setError(null);
        })
        .catch(() => {
          setSelectedStartupDetails(null);
          setVacancyOptions([]);
          setSelectedVacancyId(null);
          setError("Ошибка при загрузке данных стартапа");
        })
        .finally(() => setLoadingDetails(false));
    } else {
      setSelectedStartupDetails(null);
      setVacancyOptions([]);
      setSelectedVacancyId(null);
    }
  }, [selectedStartupId]);

  const handleStartupChange = (option: DropdownOption | null) => {
    if (option) {
      setSelectedStartupId(Number(option.id));
    } else {
      setSelectedStartupId(null);
    }
  };

  const handleVacancyChange = (option: DropdownOption | null) => {
    if (option) {
      setSelectedVacancyId(Number(option.id));
    } else {
      setSelectedVacancyId(null);
    }
  };

  const handleInvite = () => {
    if (!selectedStartupDetails) {
      setError("Пожалуйста, выберите стартап");
      return;
    }
    if (!selectedVacancyId) {
      setError("Пожалуйста, выберите вакансию");
      return;
    }
    setError(null);
    onInvite(selectedStartupDetails.id, selectedVacancyId);
  };

  if (loading) return <Loading />;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Пригласить в стартап"
      className="w-1/3 h-80"
    >
      <div className="flex flex-col gap-4">
        {error && (
          <ErrorMessage onClose={() => setError(null)}>{error}</ErrorMessage>
        )}

        <DropdownList
          id="startups"
          label="Стартап"
          options={startupOptions}
          onChange={handleStartupChange}
          value={selectedStartupId ?? ""}
          placeholder="Выберите стартап"
          disabled={loading}
          border
        />

        <div className="relative">
          <DropdownList
            id="vacancies"
            label="Вакансия"
            options={vacancyOptions}
            onChange={handleVacancyChange}
            value={selectedVacancyId ?? ""}
            placeholder="Выберите вакансию"
            disabled={loadingDetails || vacancyOptions.length === 0}
            border
          />
          {selectedStartupId && vacancyOptions.length === 0 && (
            <p className="absolute b-0 text-caption italic text-red-500">
              Нет активных вакансий
            </p>
          )}
        </div>

        <div className="mt-2">
          <Button onClick={handleInvite} disabled={loading || loadingDetails}>
            Отправить приглашение
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InviteModal;

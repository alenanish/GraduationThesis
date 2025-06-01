import { Gmail, Phone } from "@/app/components/icons";
import { Input } from "@/app/components/ui";

interface ContactInfoProps {
  contactPhone: string | null;
  setContactPhone: (phone: string | null) => void;
  contactEmail: string | null;
  setContactEmail: (email: string | null) => void;
  phoneError: string | null;
  setPhoneError: (error: string | null) => void;
  emailError: string | null;
  setEmailError: (error: string | null) => void;
}

const EditContactInfo: React.FC<ContactInfoProps> = ({
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  phoneError,
  setPhoneError,
  emailError,
  setEmailError,
}) => {
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function isValidContactNumber(phoneNumber: string) {
    const regex = /^(?:\+7|8)\d{10}$/;
    return regex.test(phoneNumber);
  }

  return (
    <div className="bg-base-0 p-4 rounded-[8px] flex flex-col gap-y-1.5">
      <h2 className="text-body-m font-medium">Контакты:</h2>
      <div className="content-end ">
        <Input
          required
          id="contact_phone"
          name="contact_phone"
          label="Телефон"
          type="tel"
          maxLength={12}
          placeholder="+70000000000"
          size="s"
          onChange={setContactPhone}
          value={contactPhone ? contactPhone : ""}
          leftIcon={<Phone size={16} />}
          state={phoneError ? "error" : "enabled"}
          errorText={phoneError ? phoneError : null}
          onBlur={() => {
            if (contactPhone && !isValidContactNumber(contactPhone)) {
              setPhoneError("Неверный формат номера.");
            } else {
              setPhoneError(null);
            }
          }}
        />
      </div>
      <div className="content-end ">
        <Input
          required
          id="contact_email"
          name="contact_email"
          label="Почта"
          placeholder="mail@gmail.com"
          size="s"
          type="email"
          onChange={setContactEmail}
          value={contactEmail ? contactEmail : ""}
          leftIcon={<Gmail size={16} />}
          state={emailError ? "error" : "enabled"}
          errorText={emailError ? emailError : null}
          onBlur={() => {
            if (!contactEmail) {
              setEmailError("Заполните это поле");
            } else if (contactEmail && !isValidEmail(contactEmail)) {
              setEmailError("Неверный формат почты.");
            } else {
              setEmailError(null);
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditContactInfo;

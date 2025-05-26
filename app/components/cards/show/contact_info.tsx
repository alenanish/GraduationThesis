"use client";

import { Gmail, Phone } from "@/app/components/icons";
import Label from "@/app/components/ui/text/label";
import React from "react";

interface ContactInfoProps {
  contact_phone?: string | null;
  contact_email?: string | null;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  contact_email,
  contact_phone,
}) => {
  return (
    <Label label="Контакты" >
      <div className="flex flex-row gap-2 items-center">
        <Phone size={16} color="var(--color-prime-500)" /> {contact_phone}
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Gmail size={16} color="var(--color-prime-500)" /> {contact_email}
      </div>
    </Label>
  );
};

export default ContactInfo;

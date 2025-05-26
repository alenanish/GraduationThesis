"use client";

import Label from "@/app/components/ui/text/label";
import React from "react";

interface BioProps {
  bio?: string | null;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <Label label="Описание">
      <p className="text-body-m text-base-500 whitespace-pre-wrap">{bio}</p>
    </Label>
  );
};

export default Bio;

"use client";
import React from "react";
import { Avatar, Button, IconButton, ProjectState } from "@/app/components/ui";
import Link from "next/link";
import {  Delete } from "../icons";
import { StartupFounderType } from "../../types/startup";

interface StartupProps {
  startup: StartupFounderType;
}

const StartupCardFounder: React.FC<StartupProps> = ({ startup }) => {
  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
       bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
       hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)] transition-all duration-150"
    >
      <Avatar avatar={startup.image} role="startup" />

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <Link key={startup.id} href={`/startups/${startup.id}`}>
          <div className="flex flex-row gap-x-4 items-center ">
            <h2 className="text-h4 text-base-900">{startup.title}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">
              {startup.industry && startup.industry.name}
            </p>
          </div>
        </Link>
        <div className=" flex-grow ">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {startup.description}
          </p>
        </div>

        <div className="flex flex-row gap-x-1 items-center  mt-2">
          <h3 className="text-body-m text-base-900 ">Стадия:</h3>
          <ProjectState size={20} state={startup.stage} />
        </div>

        <Link
          href={`/startups/${startup.id}/edit`}
          className="w-fit mt-2"
          passHref
        >
          <Button className="mt-2">Редактировать</Button>
        </Link>
      </div>
      <IconButton type="button" variant="tertiary" color='base' size="s">
        <Delete />
      </IconButton>
    </div>
  );
};

export default StartupCardFounder;

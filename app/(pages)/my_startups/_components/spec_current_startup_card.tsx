"use client";
import React from "react";
import { Avatar, ProjectState } from "@/app/components/ui";
import { MyStartupType } from "@/app/types/startup";
import { useRouter } from "next/navigation";

const CurStartupSpecCard: React.FC<MyStartupType> = ({
  id,
  title,
  description,
  image,
  role,
  stage,
}) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-[250px] flex flex-row gap-x-4 p-4 justify-start justify-items-center
      bg-base-0 rounded-2xl overflow-hidden border-2 border-prime-500
      hover:shadow-[0_4px_16px_rgba(0,148,200,0.25)]"
    >
      <Avatar avatar={image} role="startup" />

      <div className="flex flex-col gap-y-2 w-[calc(100%-56px)] md:w-[calc(100%-318px)]">
        <div
          key={id}
          onClick={() => {
            router.push(`/startups/${id}`);
          }}
        >
          <div className="flex flex-row gap-x-4 items-center">
            <h2 className="text-h4 text-base-900">{title}</h2>
            <h2 className="text-h4 text-base-900">-</h2>
            <p className="text-base-700 text-body-s font-medium ">{role}</p>
          </div>
          <ProjectState state={stage} />
        </div>
        <div className=" flex-grow">
          <p className="text-base-500 text-h5 overflow-hidden truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurStartupSpecCard;

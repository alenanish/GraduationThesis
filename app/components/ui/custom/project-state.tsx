import React from "react";
import {
  Hourglass,
  Cached,
  RocketLaunch,
  BidLandscape,
  CheckCircle,
} from "../../icons";

type ProjectState =
  | "waiting"
  | "in_progress"
  | "launch"
  | "analysis"
  | "completed";

interface ProjectStateProps {
  state?: string | ProjectState;
  className?: string;
  size?: string | number;
}

const ProjectState: React.FC<ProjectStateProps> = ({
  state = "waiting",
  className = "",
  size = 28,
  ...rest
}) => {
  const baseStyles =
    "flex flex-row items-center justify-center gap-1 text-body-m w-fit text-base-700 ";
  let icon, text, color;

  switch (state) {
    case "waiting":
      icon = <Hourglass size={size} color={"var(--color-prime-500)"} />;
      text = "Ожидание";
      break;
    case "in_progress":
      icon = <Cached size={size} color={"var(--color-prime-500)"} />;
      text = "В процессе";
      break;
    case "launch":
      icon = <RocketLaunch size={size} color={"var(--color-prime-500)"} />;
      text = "Запуск";
      break;
    case "analysis ":
      icon = <BidLandscape color={"var(--color-prime-500)"} />;
      text = "Анализ результатов";
      break;
    case "completed":
      icon = <CheckCircle color={"var(--color-prime-500)"} />;
      text = "Завершено";
      break;
    default:
      icon = <Hourglass size={size} color={"var(--color-prime-500)"} />;
      text = "Ожидание";
      break;
  }

  const projectStateClasses = [baseStyles, className, color].join(" ");

  return (
    <div {...rest} className={projectStateClasses}>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default ProjectState;

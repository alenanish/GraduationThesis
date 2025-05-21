import React from "react";
import { useAuth } from "../../../context/auth_context";
import InvestorRecommendations from "./investors";
import SpecialistRecommendations from "./specialists";
import FounderRecommendations from "./startups";

const Recommendations = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "startup":
      return <FounderRecommendations />;
    case "investor":
      return <InvestorRecommendations />;
    case "specialist":
      return <SpecialistRecommendations />;
    default:
      return <div>Неизвестная роль пользователя.</div>;
  }
};

export default Recommendations;

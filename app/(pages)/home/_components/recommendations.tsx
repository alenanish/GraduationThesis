import React from "react";
import { useAuth } from "../../../context/auth_context";
import InvestorRecommendations from "./investor_recommendations";
import SpecialistRecommendations from "./specialist_recommendations";
import FounderRecommendations from "./founder_recommendations";

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

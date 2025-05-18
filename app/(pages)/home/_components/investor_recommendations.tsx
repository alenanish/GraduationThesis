"use client"
import React, { useState, useEffect } from 'react';
import { authenticatedRequest } from '@/app/utils/api';
import { StartupForInvestmentsCardType } from '@/app/types/startup';
import { StartupCardInvestor } from '@/app/components/ui';

const InvestorRecommendations = () => {
  const [startups, setStartups] = useState<StartupForInvestmentsCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await authenticatedRequest<StartupForInvestmentsCardType[]>('/search/for_investments/', 'get');
        setStartups(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Ошибка при загрузке стартапов.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка стартапов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h2>Рекомендованные стартапы:</h2>
      {startups.length > 0 ? (
        <ul>
          {startups.map((startup) => (
            <StartupCardInvestor key={startup.id} {...startup} />
          ))}
        </ul>
      ) : (
        <div>Нет рекомендованных стартапов.</div>
      )}
    </div>
  );
};

export default InvestorRecommendations;

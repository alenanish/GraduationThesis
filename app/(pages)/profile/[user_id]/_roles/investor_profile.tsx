"use client";
import { InvestorCardType } from "@/app/types/investor";
import { authenticatedRequest } from "@/app/utils/api";
import { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
import FavoriteButton from "@/app/components/ui/button/favorite_button";
import { Avatar, Bio, Button, Header, Label } from "@/app/components/ui";
import ContactInfo from "@/app/components/cards/show/contact_info";
import InvestExperience from "@/app/components/cards/investment_experience/invest_experience";
import { useRouter } from "next/navigation";

interface InvestorProfileProps {
  user_id: number;
}

const InvestorProfile: React.FC<InvestorProfileProps> = ({ user_id }) => {
  const router = useRouter();
  const [investor, setInvestor] = useState<InvestorCardType>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response: AxiosResponse<InvestorCardType> =
          await authenticatedRequest<InvestorCardType>(
            `/profile/${user_id}/`,
            "get"
          );
        setInvestor(response.data);
      } catch (err: any) {
        setError(err?.message || "Ошибка при загрузке.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!investor) {
    return;
  }

  return (
    <div className="gap-x-4 grid grid-cols-5">
      <div className="flex flex-col gap-y-4 col-span-4">
        <Header
          title={investor.full_name}
          subTitle={investor.industry?.name}
          button={
            <FavoriteButton
              isInitiallyFavorited={investor.is_favorited}
              item={{ user_id: investor.user_id }}
            />
          }
        />

        <Bio bio={investor.bio} />

        <Label label="Опыт работы">
          <InvestExperience experiences={investor.experience} isEdit={false} />
        </Label>
      </div>

      <div className="flex flex-col gap-y-4 col-span-1">
        <Avatar avatar={investor.avatar} role="user" />
        <div
          onClick={() => {
            router.push(`/messages/${investor.user_id}`);
          }}
        >
          <Button className="w-full" type="button">
            Написать
          </Button>
        </div>

        <ContactInfo
          contact_email={investor.contact_email}
          contact_phone={investor.contact_phone}
        />
      </div>
    </div>
  );
};

export default InvestorProfile;

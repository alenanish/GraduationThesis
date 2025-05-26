"use client";
import Recommendations from "@/app/(pages)/home/_components/recommendations";
import { Label } from "@/app/components/ui";
import Carousel from "@/app/components/ui/custom/сarousel";
import React from "react";

const HomePage = () => {
  return (
    <div className=" flex flex-col gap-y-4 ">
      <Carousel
        items={[
          {
            id: 1,
            imageUrl: "image1.png",
            altText: "Image 1",
            title: "Title 1",
            description: "Description 1",
          },
          {
            id: 2,
            imageUrl: "image2.png",
            altText: "Image 2",
            title: "Title 2",
            description: "Description 2",
          },
          {
            id: 3,
            imageUrl: "image3.png",
            altText: "Image 3",
            title: "Title 3",
            description: "Description 3",
          },
        ]}
        itemWidth="60%"
      />

      <Label label="Рекомендации" size="l">
        <Recommendations />
      </Label>
    </div>
  );
};

export default HomePage;

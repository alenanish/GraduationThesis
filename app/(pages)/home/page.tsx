"use client";
import Recommendations from "@/app/(pages)/home/_components/recommendations";
import Carousel from "@/app/components/ui/сarousel";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-4 my-4">
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
      />

      <div className="mx-4 bg-base-0  rounded-[14px] p-4 flex flex-col gap-y-5">
        <h2 className="text-base-900 text-h4 font-medium">Рекомендации</h2>
        <Recommendations />
      </div>
    </div>
  );
};

export default HomePage;

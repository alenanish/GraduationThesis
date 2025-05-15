"use client";
import React from "react";

import MarketingPage1 from "./_components/page1";
import MarketingPage2 from "./_components/page2";
import MarketingPage3 from "./_components/page3";
import MarketingPage4 from "./_components/page4";

const MarketingPage = () => {
  
  return (
    <div className="flex flex-col gap-y-10 mt-[60px] m-4">
      <MarketingPage1 />
      <MarketingPage2 />
      <MarketingPage3 />
      <MarketingPage4 />
    </div>
  );
};

export default MarketingPage;

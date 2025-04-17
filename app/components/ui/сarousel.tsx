import React, { useState, useRef, useEffect } from "react";
import IconButton from "./button/icon-button";
import { ArrowBackward, ArrowForward } from "../icons";

interface CarouselItem {
  id: number;
  imageUrl: string;
  altText: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showSteppers?: boolean;
  showButtons?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoSlide = false,
  showSteppers = true,
  showButtons = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const previousIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);

    return () => clearInterval(intervalId);
  }, [activeIndex]);

  return (
    <div
      className=" relative w-full h-fit flex items-center justify-center"
      ref={carouselRef}
    >
      {/* Previous Item */}
      <div className="absolute scale-[0.8] translate-x-[-25%] blur-xs left-0 h-full w-1/3 shadow-none transition-all duration-300 hover:blur-[2px]">
        <img
          src={items[previousIndex].imageUrl}
          alt={items[previousIndex].altText}
          className="object-cover h-full w-full"
          onClick={handlePrev}
        />
      </div>

      {/* Active Item */}
      <div
        className="relative h-full w-fit transition-all m- duration-300"
        style={{ zIndex: 1 }}
      >
        <img
          src={items[activeIndex].imageUrl}
          alt={items[activeIndex].altText}
          className="object-cover h-full w-full transform"
        />
        {/* Stepper */}
        {showSteppers && (
          <div className="absolute bottom-7 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-8 rounded-full focus:outline-none ${
                  index === activeIndex
                    ? "bg-prime-500"
                    : "bg-prime-100 hover:bg-prime-600"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next Item */}
      <div
        className={`absolute scale-[0.8] translate-x-[25%] blur-xs right-0 h-full w-1/3 transition-all duration-300  hover:blur-[2px]`}
      >
        <img
          src={items[nextIndex].imageUrl}
          alt={items[nextIndex].altText}
          className="object-cover h-full w-full"
          onClick={handleNext}
        />
      </div>

      {showButtons && (
        <IconButton
          variant="tertiary"
          size="s"
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
        >
          <ArrowForward />
        </IconButton>
      )}

      {showButtons && (
        <IconButton
          variant="tertiary"
          size="s"
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          aria-label="Next Slide"
        >
          <ArrowBackward />
        </IconButton>
      )}
    </div>
  );
};

export default Carousel;

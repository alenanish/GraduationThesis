import React, { useState, useRef, useEffect } from "react";
import IconButton from "../button/icon-button";
import { ArrowBackward, ArrowForward } from "../../icons";

interface CarouselItem {
  id: number;
  imageUrl: string;
  altText: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  showSteppers?: boolean;
  showButtons?: boolean;
  itemWidth?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  showSteppers = true,
  showButtons = false,
  itemWidth = "70%",
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
  }, [activeIndex, handleNext]);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      ref={carouselRef}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Previous Item */}
        <div className="absolute left-0 h-full w-1/3 transition-all duration-300 transform origin-center">
          <div className="h-full w-full  flex justify-end">
            {" "}
            {/* Added flex and justify-end */}
            <img
              src={items[previousIndex].imageUrl}
              alt={items[previousIndex].altText}
              className="object-cover h-full w-full blur-xs hover:blur-none cursor-pointer scale-[0.8]"
              onClick={handlePrev}
            />
          </div>
        </div>

        {/* Active Item */}
        <div
          className="relative h-full transition-all duration-300"
          style={{ width: itemWidth, zIndex: 1 }}
        >
          <img
            src={items[activeIndex].imageUrl}
            alt={items[activeIndex].altText}
            className="object-cover h-full w-full"
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
        <div className="absolute right-0 h-full w-1/3 transition-all duration-300 transform origin-center">
          <div className="h-full w-full overflow-hidden flex justify-start">
            {" "}
            {/* Added flex and justify-start */}
            <img
              src={items[nextIndex].imageUrl}
              alt={items[nextIndex].altText}
              className="object-cover h-full w-full blur-xs hover:blur-none cursor-pointer scale-[0.8]"
              onClick={handleNext}
            />
          </div>
        </div>
      </div>

      {showButtons && (
        <IconButton
          variant="tertiary"
          size="s"
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
        >
          <ArrowBackward />
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
          <ArrowForward />
        </IconButton>
      )}
    </div>
  );
};

export default Carousel;

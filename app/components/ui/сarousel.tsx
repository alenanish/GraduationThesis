import React, { useState, useRef, useEffect, ReactNode } from "react";
import IconButton from "./button/icon-button";
import { ArrowBackward, ArrowForward } from "../icons";

interface CarouselProps {
  children: ReactNode[] | ReactNode;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showSteppers?: boolean;
  showButtons?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoSlide = false,
  autoSlideInterval = 1000,
  showSteppers = true,
  showButtons = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const items = React.Children.toArray(children);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, autoSlideInterval);

    return () => clearTimeout(transitionTimeout);
  }, [currentIndex]);

  useEffect(() => {
    if (autoSlide) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoSlide, autoSlideInterval, items.length]);

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        ref={carouselRef}
      >
        {items.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {showButtons && (
        <IconButton
          variant="tertiary"
          size="s"
          state={isTransitioning ? "disabled" : "enabled"}
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
        >
          <ArrowForward />
        </IconButton>
      )}

      {showButtons && (
        <IconButton
          variant="tertiary"
          state={isTransitioning ? "disabled" : "enabled"}
          size="s"
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          aria-label="Next Slide"
        >
          <ArrowBackward />
        </IconButton>
      )}

      {/* Stepper */}
      {showSteppers && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-8 rounded-full focus:outline-none ${
                index === currentIndex
                  ? "bg-prime-500"
                  : "bg-prime-100 hover:bg-prime-600"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

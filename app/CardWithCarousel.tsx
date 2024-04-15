import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageProps {
  src: string;
  alt: string;
  id: string;
}

interface CardWithCarouselProps {
  images: ImageProps[];
  className?: string;
}

const CardWithCarousel: React.FC<CardWithCarouselProps> = ({
  images,
  className = "",
}) => {
  const [activeImage, setActiveImage] = useState<ImageProps>(images[0]);

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === activeImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setActiveImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = images.findIndex((img) => img.id === activeImage.id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setActiveImage(images[prevIndex]);
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={activeImage.src}
        alt={activeImage.alt}
        width={500}
        height={300}
        className="w-full h-auto rounded-xl overflow-hidden"
      />
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-0 hover:opacity-100">
        <button onClick={handlePrev} className="btn btn-circle">
          ❮
        </button>
        <button onClick={handleNext} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  );
};

export default CardWithCarousel;

"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AutoScrollCarouselProps {
  images: string[];
  isFull?: boolean;
}

export function AutoScrollCarousel({
  images,
  isFull,
}: AutoScrollCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent
                className={cn(
                  "flex aspect-auto p-0",
                  isFull
                    ? "h-[calc(100vh-150px)]"
                    : " h-[300px] lg:h-[350px] xl:h-[400px]"
                )}
              >
                <Image
                  src={image}
                  alt={index.toString()}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto rounded-xl object-cover"
                  quality={50}
                  loading="lazy"
                  // placeholder="blur"
                  // blurDataURL={image}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

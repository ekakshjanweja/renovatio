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

export function AutoScrollCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const images: string[] = [
    "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1682687220336-bbd659a734e7?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708169652663-0e71cf739405?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-0">
              <Card>
                <CardContent className="flex aspect-auto p-0 h-[400px] md:h-[700px]">
                  <Image
                    src={image}
                    alt={index.toString()}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

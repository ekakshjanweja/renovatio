"use client";

import React from "react";

import Image from "next/image";

import { BentoGrid, BentoGridItem } from "./aceternity/bento-grid";

export function ImagesGridHomePage() {
  return (
    <BentoGrid className="mt-16 max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={<Skeleton image={item.image} />}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = ({ image }: { image: string }) => (
  <div className="flex flex-1 w-full h-full  min-h-[6rem] rounded-xl ">
    <Image
      alt=""
      src={image}
      width="0"
      height="0"
      sizes="100vw"
      className="rounded-xl object-cover w-full"
    />
  </div>
);

interface PortfolioItem {
  title: string;
  description: string;

  image: string;
}

const items: PortfolioItem[] = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",

    image:
      "https://images.unsplash.com/photo-1682685797703-2bb22dbb885b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",

    image:
      "https://images.unsplash.com/photo-1707343846292-0c11438d145f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",

    image:
      "https://images.unsplash.com/photo-1708769915551-2f4a13f4b9e3?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",

    image:
      "https://images.unsplash.com/photo-1707341529566-5c63668edc11?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",

    image:
      "https://images.unsplash.com/photo-1707574133815-f52116ad01c2?q=80&w=920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",

    image:
      "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",

    image:
      "https://images.unsplash.com/photo-1707343843344-011332037abb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

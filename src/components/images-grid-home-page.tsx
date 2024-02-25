"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BentoGrid, BentoGridItem } from "./aceternity/bento-grid";
import Link from "next/link";
import { projects } from "@/lib/data";

export function ImagesGridHomePage() {
  return (
    <BentoGrid className="mt-16 max-w-4xl mx-auto">
      {projects.map((item, i) => (
        <BentoGridItem
          key={i}
          href={`/projects/${item.id}`}
          title={item.title}
          description={item.subtitle}
          header={<Skeleton image={item.images[1]} />}
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

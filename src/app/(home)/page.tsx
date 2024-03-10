"use client";

import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { ImagesGridHomePage } from "@/components/images-grid-home-page";
import { Loading } from "@/components/loading";
import { useState } from "react";

const HomePage = () => {
  const images: string[] = [
    "https://images.unsplash.com/photo-1682687982185-531d09ec56fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1682687220336-bbd659a734e7?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1708169652663-0e71cf739405?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);
  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div>
            <AutoScrollCarousel isProjectPage={false} images={images} />
            <div className="flex flex-col items-center sm:items-center justify-center pt-4 pb-12 dark:bg-white dark:bg-opacity-5 bg-stone-500 bg-opacity-20 rounded-xl mt-2 px-4">
              <p className="text-xl sm:text-3xl tracking-wide">
                Interiors and Architecture
              </p>
              <p className="text-sm sm:text-lg  opacity-50 ">
                Transforming Spaces with Creativity and Precision
              </p>
            </div>

            <div className="relative ">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-0.5 h-10 top-[50px]-rotate-180 bg-stone-50 dark:bg-stone-50" />
                <div className="w-0.5 h-10 top-[100px]-rotate-180  bg-stone-500 dark:bg-stone-400" />
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex flex-col items-center sm:items-center justify-center rounded-xl mt-2 px-4">
              <p className="text-xl sm:text-3xl tracking-wide">Our Work</p>
              <p className="text-sm sm:text-lgopacity-50 ">
                interiors | architecture | planning
              </p>
            </div>

            <ImagesGridHomePage />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;

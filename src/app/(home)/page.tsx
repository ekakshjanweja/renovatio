import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { ImagesGridHomePage } from "@/components/images-grid-home-page";
import { BlogRow } from "./_components/blog-row";

const HomePage = () => {
  return (
    <>
      <div>
        <AutoScrollCarousel />
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
            Transforming Spaces with Creativity and Precision
          </p>
        </div>

        <ImagesGridHomePage />
      </div>

      <BlogRow />
    </>
  );
};

export default HomePage;

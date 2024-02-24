import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { LayoutComponent } from "@/components/layout-component";

const HomePage = () => {
  return (
    <>
      <div>
        <AutoScrollCarousel />
        <div className="flex flex-col items-center sm:items-center justify-center pt-4 pb-12 dark:bg-white dark:bg-opacity-5 bg-stone-500 bg-opacity-20 rounded-xl mt-2 px-4">
          <p className="text-xl sm:text-3xl tracking-wide  font-bold">
            Interiors and Architecture
          </p>
          <p className="text-sm sm:text-lg dark:text-red-900 text-red-600">
            Transforming Spaces with Creativity and Precision
          </p>
        </div>

        <div className="relative ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-10 top-[50px]-rotate-180 bg-stone-50 dark:bg-stone-950" />
            <div className="w-1.5 h-10 top-[100px]-rotate-180  bg-red-600 dark:bg-red-950" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

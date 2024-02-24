import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { LayoutComponent } from "@/components/layout-component";

const HomePage = () => {
  return (
    <>
      <div>
        <AutoScrollCarousel />
        <div className="flex flex-col items-center justify-center py-12 bg-white bg-opacity-5 rounded-xl mt-2">
          <p className="text-3xl tracking-wide  font-bold">
            Interiors and Architecture
          </p>
          <p className="text-md text-[#904f4f]">
            Transforming Spaces with Creativity and Precision
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;

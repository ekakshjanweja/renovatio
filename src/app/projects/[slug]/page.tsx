"use client";

import { AutoScrollCarousel } from "@/components/auto-scroll-carousel";
import { projects } from "@/lib/data";
import { notFound } from "next/navigation";

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  console.log(slug);

  const project = projects.find((project) => project.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center w-full">
          <AutoScrollCarousel isProjectPage={true} images={project.images} />
        </div>

        <div className="flex flex-col items-center sm:items-center justify-center pt-4 pb-12 dark:bg-white dark:bg-opacity-5 bg-stone-900 bg-opacity-5 rounded-xl mt-2 px-4 ">
          <p className="text-xl sm:text-3xl tracking-wide">{project?.title}</p>
          <p className="text-sm sm:text-lg text-center text-muted-foreground ">
            {project?.subtitle}
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-1/2 gap-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-md">{project.timeline}</p>
              <p className="text-xs text-muted-foreground ">Timeline</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-md">{project?.location}</p>
              <p className="text-xs text-muted-foreground ">Location</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-md">{project?.area} sqm</p>
              <p className="text-xs text-muted-foreground ">Area</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-md">{project?.category}</p>
              <p className="text-xs text-muted-foreground ">Category</p>
            </div>
          </div>
        </div>

        <div className="relative ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="w-0.5 h-10 top-[50px]-rotate-180 bg-stone-800 dark:bg-stone-50" />
            <div className="w-0.5 h-10 top-[100px]-rotate-180  bg-stone-500 dark:bg-stone-400" />
          </div>
        </div>
      </div>
      <div className="lg:grid lg:grid-cols-5">
        <div></div>
        <p className="px-6 my-16 text-muted-foreground text-sm col-span-3">
          {project?.description}
        </p>
      </div>
      <div></div>
    </>
  );
};

export default ProjectPage;

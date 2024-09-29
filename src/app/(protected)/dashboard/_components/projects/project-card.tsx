import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, ImagePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    userId: string | null;
    thumbnailUrl: string | null;
    location: string;
    area: number;
    description: string;
    category: string;
    designerId: string | null;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  //TODO: Add Status Property to Project Model

  return (
    <>
      <Link
        href={`/${project.id}`}
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-0 dark:bg-stone-900 dark:border-stone-50/[0.2] bg-neutral-50 border border-transparent justify-between flex flex-col space-y-4"
        )}
      >
        <div className="aspect-square flex flex-1 w-full h-full min-h-[6rem] md:max-h-56 rounded-xl p-0 bg-gradient-to-tl from-lime-950 to-stone-950">
          {project.thumbnailUrl && (
            <Image
              alt={project.name}
              src={project.thumbnailUrl!}
              width="0"
              height="0"
              sizes="100vw"
              className="rounded-xl object-cover w-full"
              quality={50}
              placeholder="blur"
              blurDataURL={project.thumbnailUrl!}
            />
          )}

          {!project.thumbnailUrl && (
            <div className="flex items-center justify-center w-full">
              <ImagePlus className="h-8 w-8 opacity-50" />
            </div>
          )}
        </div>

        <div className="px-2 pb-2 group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-bold text-stone-600 dark:text-stone-200">
            {project.name}
          </div>
          <div className="font-normal text-stone-600 text-xs dark:text-stone-300">
            {project.description.substring(0, 40) + "....."}
          </div>
          <Button variant={"outline"} size={"sm"} className="mt-4 border-2">
            Status -
            <p className="text-lime-400 dark:text-lime-400 ml-1"> Planning</p>
          </Button>
        </div>
        {/* <Edit className="absolute right-12" /> */}
      </Link>
    </>
  );
};

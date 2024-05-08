import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
    imageModel: string[];
    designerId: string | null;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {

    //TODO: Add Status Property to Project Model

  return (
    <>
      <Link
        href={`/dashboard/${project.id}`}
        className={cn(
          "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-stone-950 dark:border-stone-50/[0.2] bg-neutral-50 border border-transparent justify-between flex flex-col space-y-4"
        )}
      >
        <div className="flex flex-1 w-full h-full  min-h-[6rem] max-h-56 rounded-xl ">
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
        </div>
        <div className=" group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-bold text-stone-600 dark:text-stone-200">
            {project.name}
          </div>
          <div className="font-normal text-stone-600 text-xs dark:text-stone-300">
            {project.description.substring(0, 40) + "....."}
          </div>
          <Button variant={"outline"} size={"sm"} className="mt-4 border-2">
            Status -
            <p className="text-lime-700 dark:text-lime-400"> Planning</p>
          </Button>
        </div>
      </Link>
    </>
  );
};

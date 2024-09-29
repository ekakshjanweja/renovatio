import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { ProjectCard } from "./project-card";
import { SquareButton } from "../square-button";

export const ProjectTab = async () => {
  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="p-0 mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl pb-2 font-semibold">Project Management</h1>
            <p className="pb-4">Manage your interior design projects</p>
          </div>
          {/* 
          <Button
            variant={"default"}
            className="mb-4 rounded-md opacity-80 bg-custom hover:opacity-100 hover:bg-custom p-0"
          >
            <Plus className="h-6 w-6" />
          </Button> */}

          <SquareButton />
        </div>
        <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-auto">
          {projects.map((project) => (
            <>
              <ProjectCard project={project} key={project.id} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

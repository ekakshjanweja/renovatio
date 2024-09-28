import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { ProjectCard } from "../project-card";
import { Button } from "@/components/ui/button";

export const ProjectTab = async () => {
  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="p-0 mt-4">
        <h1 className="text-2xl pb-2 font-semibold">Project Management</h1>
        <p className="pb-4">Manage your interior design projects</p>
        <Button className="mb-4 rounded-full opacity-80 bg-custom hover:opacity-100 hover:bg-custom px-4 py-2">
          Create New Project
        </Button>
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

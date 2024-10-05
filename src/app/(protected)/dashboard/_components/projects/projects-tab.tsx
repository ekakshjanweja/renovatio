import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { ProjectCard } from "./project-card";
import { AddProjectButtonn } from "../add-project-button";
import { getCurrentUser } from "@/actions/user-action";

export const ProjectTab = async () => {
  const projects = await getAllProjectsForCurrentUser();

  const user = await getCurrentUser();

  return (
    <>
      <div className="p-0 mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl pb-2 font-semibold">Project Management</h1>
            <p className="pb-4">Manage your interior design projects</p>
          </div>
        {user.isDesigner && <AddProjectButtonn />}
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

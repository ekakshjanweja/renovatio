import { auth } from "@/auth";
import { getAllProjectsForCurrentUser } from "@/services/project-service";
import { notFound } from "next/navigation";
import { ProjectCard } from "./_components/project-card";
import { setUserDesigner } from "@/actions/user-action"

const Dashboard = async () => {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const projects = await getAllProjectsForCurrentUser();

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl pb-4">Your Projects</h1>
        <div className="grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-full mx-auto ">
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

export default Dashboard;
